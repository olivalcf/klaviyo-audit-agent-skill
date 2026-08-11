import assert from 'node:assert/strict'
import { execFileSync, spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const skillPath = resolve(root, 'klaviyo-agent-audit/SKILL.md')
const fixturePath = resolve(root, 'tests/fixtures/focused-audit.json')

test('skill has portable required frontmatter', () => {
  const skill = readFileSync(skillPath, 'utf8')
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
  assert.equal(score.account_maturity_score, 100)
  assert.equal(score.audit_coverage_percent, 100)
  assert.equal(score.evidence_confidence_percent, 100)
})

test('validator rejects personal-data fields', () => {
  const unsafe = JSON.stringify({
    ...JSON.parse(readFileSync(fixturePath, 'utf8')),
    email_address: 'do-not-store@example.invalid',
  })
  const result = spawnSync('node', [
    resolve(root, 'klaviyo-agent-audit/scripts/validate-audit.mjs'),
    '/dev/stdin',
  ], { input: unsafe, encoding: 'utf8' })
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /personal-data field not allowed/)
})
