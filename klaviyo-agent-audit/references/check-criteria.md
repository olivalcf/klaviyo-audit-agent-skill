# Reproducible check criteria

Apply these rules after deciding whether the check is relevant to the business model. Use `unverifiable` when the required evidence is missing. `Partial` means the evidence is mixed or the control exists but has a material gap; use a numeric score from 0.1 to 0.9 when the default 0.5 is too coarse.

## Flows and lifecycle

- `flows.applicable_coverage`: pass when every high-priority applicable journey has an active flow; partial when at least half are active; fail when fewer than half are active or no relevant lifecycle program exists.
- `flows.trigger_filters_exits`: pass when sampled active flows have valid triggers, eligibility filters, conversion exits, and exclusions; partial for isolated gaps; fail for systemic missing or contradictory logic.
- `flows.sequence_timing_overlap`: pass when timing matches intent and higher-intent journeys take priority without material collisions; partial for isolated overlap/timing risks; fail for repeated or severe collisions.
- `flows.performance_by_message`: pass when message-level reporting is available, adequately sized, and no material unexplained outlier remains; partial when performance is mixed or low-volume; fail when material underperformance is established and unaddressed.
- `flows.consent_tracking_testing`: pass when consent, channel, tracking, and an appropriate test/learning practice are consistently handled; partial for isolated gaps; fail for systemic consent or tracking failures.

## Data and measurement

- `data.primary_conversion_metric`: pass for an authoritative mapped business conversion; partial when usable but ambiguous or incomplete; fail when no credible business conversion exists.
- `data.event_continuity`: pass when required business events appear consistently in both windows; partial for explainable gaps/volatility; fail for zero, broken, or clearly interrupted required events.
- `data.attribution_semantics`: pass when send-attributed reports and event-time aggregates are used correctly and settings are known; partial when settings are unknown but calculations remain valid; fail when incompatible clocks or totals are mixed.
- `data.tracking_integrations`: pass when required integrations/tracking are present and recent; partial for isolated gaps; fail when the observed program cannot be measured reliably.

## Deliverability and consent

- `deliverability.bounce_complaint_trend`: pass when adequately sized current rates are stable/healthy relative to the preceding period and current official guidance; partial for weak volume or a moderate adverse trend; fail for a material, sustained risk signal.
- `deliverability.unsubscribe_engagement`: pass when unsubscribes and meaningful engagement are stable for like-for-like sends; partial for mixed results; fail for a material sustained deterioration.
- `deliverability.authentication_sender`: pass only with evidence of appropriate authentication and sender configuration; partial for incomplete evidence or a minor gap; fail for a confirmed material gap.
- `deliverability.consent_suppression`: pass when consent capture, opt-in process, exclusions, and suppression controls are consistently present; partial for isolated gaps; fail for systemic or legal/compliance risk.

## Campaign program

- `campaigns.cadence_consistency`: pass when cadence is intentional and supported by recent sends; partial when irregular or low-volume; fail when no program exists or cadence creates clear fatigue/gaps.
- `campaigns.audience_exclusions`: pass when inclusion/exclusion logic matches campaign intent; partial for isolated omissions; fail for systemic broad targeting or missing protections.
- `campaigns.performance_trend`: pass when adequately sized like-for-like outcomes are stable/improving; partial for mixed or low-volume evidence; fail for material sustained deterioration.
- `campaigns.testing_tracking`: pass when tracking and statistically responsible learning practices are present; partial for inconsistent use; fail for absent tracking or misleading test interpretation.

## Audience and segmentation

- `audience.lifecycle_segments`: pass when active lifecycle/business-stage segments cover the operating use cases; partial for meaningful but incomplete coverage; fail when no useful segments exist.
- `audience.engagement_suppression`: pass when engagement and suppression-oriented audiences are operational; partial for incomplete coverage; fail when neither exists.
- `audience.segment_health_usage`: pass when segments are active, processed, current, and demonstrably used; partial for stale/unused items; fail when no usable segments exist.
- `audience.list_governance`: pass when lists have clear purposes, appropriate opt-in, and minimal duplication; partial when opt-in is sound but structure/usage is incomplete; fail for uncontrolled or risky list governance.

## Forms and acquisition

- `forms.active_coverage`: pass when active forms cover the applicable acquisition journeys; partial for incomplete coverage; fail when acquisition requires forms but none are live.
- `forms.performance_trend`: pass when adequately sized view/submit performance is stable/improving; partial for mixed or low-volume evidence; fail for established material deterioration.
- `forms.targeting_frequency`: pass when targeting, exclusions, and display frequency match visitor intent; partial for isolated gaps; fail for systemic overexposure or irrelevant targeting.
- `forms.consent_handoff`: pass when consent language, opt-in process, list/segment handoff, and welcome experience align; partial for isolated gaps; fail for broken or risky consent handoff.

## Content and experimentation

- `content.message_hierarchy`: pass when sampled messages have one clear objective and coherent hierarchy; partial for isolated clarity issues; fail for systemic ambiguity.
- `content.subject_preview_alignment`: pass when subject, preview, and body promise align across the sample; partial for isolated gaps; fail for repeated mismatch or misleading framing.
- `content.mobile_accessibility`: pass when sampled messages are legible, operable, and accessible on mobile; partial for isolated issues; fail for material repeated barriers.
- `content.experiment_design`: pass when tests isolate a decision, use adequate samples, and inform a next action; partial for weak/inconsistent practice; fail for absent or misleading experimentation where volume supports it.
- `content.tracking_localization`: pass when tracking and applicable market/locale handling are consistent; partial for isolated gaps; fail for systemic measurement or localization errors.
