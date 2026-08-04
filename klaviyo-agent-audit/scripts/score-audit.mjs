#!/usr/bin/env node

import { readFile } from 'node:fs/promises'

const path = process.argv[2]
if (!path) {
  console.error('Usage: node scripts/score-audit.mjs <audit.json>')
  process.exit(2)
}

const audit = JSON.parse(await readFile(path, 'utf8'))
const checks = audit.checks ?? []
const statusScore = { pass: 1, partial: 0.5, fail: 0 }
const confidenceScore = { high: 1, medium: 0.7, low: 0.4 }

const totalPoints = checks.reduce((sum, check) => sum + Number(check.points || 0), 0)
const verifiable = checks.filter((check) => check.status !== 'unverifiable')
const verifiablePoints = verifiable.reduce((sum, check) => sum + Number(check.points || 0), 0)
const earnedPoints = verifiable.reduce((sum, check) => {
  const factor = check.score ?? statusScore[check.status] ?? 0
  return sum + Number(check.points || 0) * factor
}, 0)
const confidencePoints = verifiable.reduce((sum, check) => {
  return sum + Number(check.points || 0) * (confidenceScore[check.confidence] ?? 0)
}, 0)

const percent = (numerator, denominator) => denominator ? Math.round((numerator / denominator) * 1000) / 10 : 0
const maturity = percent(earnedPoints, verifiablePoints)
const coverage = percent(verifiablePoints, totalPoints)
const evidenceConfidence = percent(confidencePoints, totalPoints)
const label = coverage < 60
  ? 'directional'
  : maturity >= 85 ? 'advanced' : maturity >= 70 ? 'established' : maturity >= 50 ? 'developing' : 'foundational'

const dimensions = Object.values(checks.reduce((groups, check) => {
  const group = groups[check.dimension] ??= {
    dimension: check.dimension,
    total_points: 0,
    verifiable_points: 0,
    earned_points: 0,
  }
  group.total_points += Number(check.points || 0)
  if (check.status !== 'unverifiable') {
    group.verifiable_points += Number(check.points || 0)
    group.earned_points += Number(check.points || 0) * (check.score ?? statusScore[check.status] ?? 0)
  }
  return groups
}, {})).map((group) => ({
  dimension: group.dimension,
  score: percent(group.earned_points, group.verifiable_points),
  coverage: percent(group.verifiable_points, group.total_points),
}))

console.log(JSON.stringify({
  organization: audit.account?.organization,
  account_maturity_score: maturity,
  audit_coverage_percent: coverage,
  evidence_confidence_percent: evidenceConfidence,
  maturity_label: label,
  dimensions,
}, null, 2))
