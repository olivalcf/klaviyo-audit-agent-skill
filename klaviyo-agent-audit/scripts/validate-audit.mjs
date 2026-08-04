#!/usr/bin/env node

import { readFile } from 'node:fs/promises'

const path = process.argv[2]
if (!path) {
  console.error('Usage: node scripts/validate-audit.mjs <audit.json>')
  process.exit(2)
}

const rubric = {
  'flows.applicable_coverage': ['flows_lifecycle', 6],
  'flows.trigger_filters_exits': ['flows_lifecycle', 5],
  'flows.sequence_timing_overlap': ['flows_lifecycle', 4],
  'flows.performance_by_message': ['flows_lifecycle', 5],
  'flows.consent_tracking_testing': ['flows_lifecycle', 5],
  'data.primary_conversion_metric': ['data_measurement', 4],
  'data.event_continuity': ['data_measurement', 4],
  'data.attribution_semantics': ['data_measurement', 3],
  'data.tracking_integrations': ['data_measurement', 4],
  'deliverability.bounce_complaint_trend': ['deliverability_consent', 5],
  'deliverability.unsubscribe_engagement': ['deliverability_consent', 4],
  'deliverability.authentication_sender': ['deliverability_consent', 3],
  'deliverability.consent_suppression': ['deliverability_consent', 3],
  'campaigns.cadence_consistency': ['campaign_program', 3],
  'campaigns.audience_exclusions': ['campaign_program', 4],
  'campaigns.performance_trend': ['campaign_program', 4],
  'campaigns.testing_tracking': ['campaign_program', 4],
  'audience.lifecycle_segments': ['audience_segmentation', 3],
  'audience.engagement_suppression': ['audience_segmentation', 3],
  'audience.segment_health_usage': ['audience_segmentation', 2],
  'audience.list_governance': ['audience_segmentation', 2],
  'forms.active_coverage': ['forms_acquisition', 2],
  'forms.performance_trend': ['forms_acquisition', 3],
  'forms.targeting_frequency': ['forms_acquisition', 2],
  'forms.consent_handoff': ['forms_acquisition', 3],
  'content.message_hierarchy': ['content_experimentation', 2],
  'content.subject_preview_alignment': ['content_experimentation', 2],
  'content.mobile_accessibility': ['content_experimentation', 2],
  'content.experiment_design': ['content_experimentation', 2],
  'content.tracking_localization': ['content_experimentation', 2],
}

const required = [
  'check_id', 'dimension', 'status', 'points', 'evidence', 'source',
  'observed_at', 'confidence', 'impact', 'action', 'effort',
]
const statuses = new Set(['pass', 'partial', 'fail', 'unverifiable'])
const confidences = new Set(['high', 'medium', 'low'])
const efforts = new Set(['low', 'medium', 'high'])
const modes = new Set(['quick', 'full', 'focused'])
const forbiddenKeys = new Set([
  'email', 'email_address', 'phone', 'phone_number', 'first_name', 'last_name',
  'postal_address', 'profile_members', 'segment_members', 'list_members',
])

const audit = JSON.parse(await readFile(path, 'utf8'))
const errors = []

if (!audit.account?.organization) errors.push('account.organization is required')
if (!audit.scope?.start || !audit.scope?.end || !audit.scope?.timezone) {
  errors.push('scope.start, scope.end, and scope.timezone are required')
}
if (!modes.has(audit.scope?.mode)) errors.push('scope.mode must be quick, full, or focused')
if (!Array.isArray(audit.checks) || audit.checks.length === 0) {
  errors.push('checks must be a non-empty array')
}

const ids = new Set()
for (const [index, check] of (audit.checks ?? []).entries()) {
  for (const field of required) {
    if (check[field] === undefined || check[field] === '') {
      errors.push(`checks[${index}].${field} is required`)
    }
  }
  if (ids.has(check.check_id)) errors.push(`duplicate check_id: ${check.check_id}`)
  ids.add(check.check_id)
  if (!statuses.has(check.status)) errors.push(`${check.check_id}: invalid status`)
  if (!confidences.has(check.confidence)) errors.push(`${check.check_id}: invalid confidence`)
  if (!efforts.has(check.effort)) errors.push(`${check.check_id}: invalid effort`)
  const expected = rubric[check.check_id]
  if (!expected) {
    errors.push(`${check.check_id}: not present in the official rubric`)
  } else {
    if (check.dimension !== expected[0]) errors.push(`${check.check_id}: dimension must be ${expected[0]}`)
    if (check.points !== expected[1]) errors.push(`${check.check_id}: points must be ${expected[1]}`)
  }
  if (check.status === 'unverifiable' && check.score !== undefined) {
    errors.push(`${check.check_id}: unverifiable checks must not have a score`)
  }
  if (check.score !== undefined && (typeof check.score !== 'number' || check.score < 0 || check.score > 1)) {
    errors.push(`${check.check_id}: score must be between 0 and 1`)
  }
}

if (audit.scope?.mode === 'quick' || audit.scope?.mode === 'full') {
  for (const id of Object.keys(rubric)) {
    if (!ids.has(id)) errors.push(`missing rubric check for ${audit.scope.mode} audit: ${id}`)
  }
  const points = (audit.checks ?? []).reduce((sum, check) => sum + Number(check.points || 0), 0)
  if (points !== 100) errors.push(`quick/full audit points must total 100; received ${points}`)
}

if (audit.scope?.mode === 'focused') {
  if (!Array.isArray(audit.scope.focus_dimensions) || audit.scope.focus_dimensions.length === 0) {
    errors.push('focused audits require scope.focus_dimensions')
  } else {
    for (const check of (audit.checks ?? [])) {
      if (!audit.scope.focus_dimensions.includes(check.dimension)) {
        errors.push(`${check.check_id}: dimension is outside scope.focus_dimensions`)
      }
    }
  }
}

const visit = (value, trail = []) => {
  if (Array.isArray(value)) return value.forEach((item, index) => visit(item, [...trail, String(index)]))
  if (!value || typeof value !== 'object') return
  for (const [key, child] of Object.entries(value)) {
    if (forbiddenKeys.has(key.toLowerCase())) errors.push(`personal-data field not allowed: ${[...trail, key].join('.')}`)
    visit(child, [...trail, key])
  }
}
visit(audit)

if (errors.length) {
  console.error(`Audit validation failed (${errors.length} issue${errors.length === 1 ? '' : 's'}):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`Audit is valid: ${audit.checks.length} checks for ${audit.account.organization}`)
