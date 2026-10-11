import assert from 'node:assert/strict'
import { execFileSync, spawnSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const skillPath = resolve(root, 'klaviyo-agent-audit/SKILL.md')
const fixturePath = resolve(root, 'tests/fixtures/focused-audit.json')

test('skill has portable required frontmatter', () => {
  const skill = readFileSync(skillPath, 'utf8').replace(/\r\n/g, '\n')
  assert.match(skill, /^---\nname: klaviyo-agent-audit\n/m)
  assert.match(skill, /^description: .+/m)
  assert.match(skill, /^license: MIT$/m)
})

test('relative Markdown references in SKILL.md exist', () => {
  const skill = readFileSync(skillPath, 'utf8')
  const links = [...skill.matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1])
  for (const link of links) {
    if (/^(https?:|#)/.test(link)) continue
    assert.ok(existsSync(resolve(dirname(skillPath), link)), `Missing referenced file: ${link}`)
  }
})

test('rubric dimension weights total 100 points', () => {
  const rubric = readFileSync(resolve(root, 'klaviyo-agent-audit/references/audit-rubric.yaml'), 'utf8')
  const weights = [...rubric.matchAll(/^    points: (\d+)$/gm)].map((match) => Number(match[1]))
  assert.equal(weights.reduce((sum, value) => sum + value, 0), 100)
})

test('OpenAI dependency uses the official Klaviyo MCP in read-only mode', () => {
  const metadata = readFileSync(resolve(root, 'klaviyo-agent-audit/agents/openai.yaml'), 'utf8')
  assert.match(metadata, /https:\/\/mcp\.klaviyo\.com\/mcp\?[^\n"]*read-only=true/)
  assert.match(metadata, /core-tools-only=false/)
})

test('focused fixture validates and scores deterministically', () => {
  const validation = execFileSync('node', [
    resolve(root, 'klaviyo-agent-audit/scripts/validate-audit.mjs'),
    fixturePath,
  ], { encoding: 'utf8' })
  assert.match(validation, /Audit is valid/)

  const score = JSON.parse(execFileSync('node', [
    resolve(root, 'klaviyo-agent-audit/scripts/score-audit.mjs'),
    fixturePath,
  ], { encoding: 'utf8' }))
  assert.equal(score.domain_maturity_score, 100)
  assert.equal(score.account_maturity_score, undefined)
  assert.equal(score.audit_coverage_percent, 26.7)
  assert.equal(score.evidence_confidence_percent, 26.7)
  assert.equal(score.maturity_label, 'directional')
})

test('focused scope omissions and unknown dimensions cannot be scored', () => {
  const fixture = JSON.parse(readFileSync(fixturePath, 'utf8'))
  const directory = mkdtempSync(join(tmpdir(), 'klaviyo-focused-scope-'))
  const input = join(directory, 'audit.json')
  try {
    for (const invalid of [
      { ...fixture, checks: fixture.checks.slice(0, 1) },
      { ...fixture, scope: { ...fixture.scope, focus_dimensions: ['data_measurement', 'unknown'] } },
    ]) {
      writeFileSync(input, JSON.stringify(invalid))
      for (const script of ['validate-audit.mjs', 'score-audit.mjs']) {
        const result = spawnSync(process.execPath, [
          resolve(root, 'klaviyo-agent-audit/scripts', script), input,
        ], { encoding: 'utf8' })
        assert.notEqual(result.status, 0)
        assert.match(result.stderr, /missing rubric check|unknown focus dimension/)
        assert.equal(result.stdout, '')
      }
    }
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})

test('validator rejects personal-data fields', () => {
  const unsafe = JSON.stringify({
    ...JSON.parse(readFileSync(fixturePath, 'utf8')),
    email_address: 'do-not-store@example.invalid',
  })
  const directory = mkdtempSync(join(tmpdir(), 'klaviyo-agent-skill-test-'))
  const unsafeFixture = join(directory, 'unsafe-audit.json')
  try {
    writeFileSync(unsafeFixture, unsafe)
    const result = spawnSync('node', [
      resolve(root, 'klaviyo-agent-audit/scripts/validate-audit.mjs'),
      unsafeFixture,
    ], { encoding: 'utf8' })
    assert.notEqual(result.status, 0)
    assert.match(result.stderr, /personal-data field not allowed/)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})

test('focused evidence extremes retain complete scope and domain labels', () => {
  const fixture = JSON.parse(readFileSync(fixturePath, 'utf8'))
  const directory = mkdtempSync(join(tmpdir(), 'klaviyo-evidence-extremes-'))
  const input = join(directory, 'audit.json')
  try {
    for (const status of ['pass', 'unverifiable']) {
      const checks = fixture.checks.map(({ score, ...check }) => ({ ...check, status, confidence: 'high' }))
      writeFileSync(input, JSON.stringify({ ...fixture, checks }))
      const result = JSON.parse(execFileSync(process.execPath, [
        resolve(root, 'klaviyo-agent-audit/scripts/score-audit.mjs'), input,
      ], { encoding: 'utf8' }))
      const expected = status === 'pass' ? 100 : 0
      assert.equal(result.domain_maturity_score, expected)
      assert.equal(result.audit_coverage_percent, expected)
      assert.equal(result.evidence_confidence_percent, expected)
      assert.equal(result.account_maturity_score, undefined)
      assert.equal(result.maturity_label, status === 'pass' ? 'advanced' : 'directional')
    }
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
