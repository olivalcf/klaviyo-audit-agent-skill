# Example audit report

> **Illustrative and sanitized.** “Demo Commerce” is fictional. The numbers below demonstrate the report contract and should not be treated as benchmarks.

# Klaviyo account audit — Demo Commerce

**Mode:** Quick<br>
**Window:** 2026-07-01 to 2026-07-30 in Europe/London<br>
**Compared with:** 2026-06-01 to 2026-06-30<br>
**Primary conversion metric:** Placed Order

## Executive summary

| Measure | Result | Meaning |
| --- | ---: | --- |
| Account maturity | 74/100 | Established foundation across verifiable checks |
| Audit coverage | 83% | Most structural and aggregate performance checks were supported |
| Evidence confidence | 75% | Several content and authentication checks lacked direct evidence |

**Key takeaway:** The account has a functioning campaign and lifecycle foundation, but overlapping cart/checkout journeys and incomplete audience governance create the clearest near-term risk.

## Scorecard

| Dimension | Score | Coverage | Finding |
| --- | ---: | ---: | --- |
| Flows and lifecycle | 68 | 100% | Core journeys exist; intent overlap and weak exits need attention |
| Data and measurement | 82 | 100% | Primary conversion is mapped and stable; tracking documentation is incomplete |
| Deliverability and consent | 78 | 73% | Aggregate rates are stable; authentication was not directly verifiable |
| Campaign program | 76 | 100% | Cadence is consistent; test design is uneven |
| Audience and segmentation | 60 | 80% | Engagement cohorts exist; lifecycle usage is incomplete |
| Forms and acquisition | 88 | 70% | Active form performance is stable; targeting evidence is partial |
| Content and experimentation | 70 | 60% | Sampled messages are clear; mobile and localization evidence is incomplete |

## Five strongest findings

### 1. Cart and checkout journeys can compete for the same high-intent profiles

- **Evidence:** Both active journeys were eligible for the same conversion path; sampled exit logic did not prove that the lower-intent flow yields consistently.
- **Why it matters:** Duplicate or closely timed messages can increase fatigue and make attributed flow performance harder to interpret.
- **Confidence:** High
- **Recommended action:** Define journey precedence, add conversion/eligibility exits, and QA timing with test profiles before increasing volume.

### 2. Campaign outcomes improved, but the test history does not isolate decisions

- **Evidence:** Like-for-like click and conversion outcomes improved from the preceding period, while multiple sampled tests changed more than one variable.
- **Why it matters:** A positive result cannot be attributed confidently to a specific change.
- **Confidence:** Medium
- **Recommended action:** Use one decision per test and record the follow-on action before launching the next experiment.

### 3. Lifecycle audience coverage is incomplete

- **Evidence:** Engagement and recent-buyer audiences were present, but no clearly operational second-purchase or lapsing-customer cohort was observed.
- **Why it matters:** Important journeys and campaign exclusions may rely on repeated manual logic.
- **Confidence:** High
- **Recommended action:** Define lifecycle cohorts from observed purchase and engagement events, then document their intended uses.

### 4. Form performance is stable, but targeting could not be fully verified

- **Evidence:** Aggregate views and submissions were available; page rules and frequency controls were not exposed by the installed MCP.
- **Why it matters:** A good aggregate conversion rate can coexist with irrelevant exposure or fatigue.
- **Confidence:** Low
- **Recommended action:** Review page targeting, mobile behavior, exclusions, and display frequency in Klaviyo; keep the check unverifiable until evidence is available.

### 5. Authentication should not be inferred from campaign rates

- **Evidence:** Bounce and complaint reporting was available, but domain authentication settings were not.
- **Why it matters:** Healthy recent aggregate rates do not prove that the technical sender setup is complete.
- **Confidence:** High for the evidence gap
- **Recommended action:** Verify SPF/DKIM and sender-domain configuration through an authorized source before marking the check complete.

## Prioritized action plan

### Now — next 7 days

| Action | Evidence | Impact | Effort | Owner |
| --- | --- | --- | --- | --- |
| Resolve cart/checkout precedence and exits | Overlapping eligibility and incomplete exit evidence | High | Medium | Lifecycle operator |
| Verify sender authentication outside the current MCP evidence | Authentication check unavailable | High | Low | Deliverability/technical owner |

### Next — next 30 days

| Action | Evidence | Impact | Effort | Owner |
| --- | --- | --- | --- | --- |
| Build and operationalize lifecycle cohorts | Missing second-purchase/lapsing use cases | Medium | Medium | CRM strategist |
| Standardize one-variable experiment briefs | Mixed-variable tests | Medium | Low | Campaign owner |
| Review form page/frequency targeting | Aggregate-only form evidence | Medium | Low | Acquisition owner |

### Later — test and learn

| Action | Evidence | Impact | Effort | Owner |
| --- | --- | --- | --- | --- |
| Test flow timing after overlap controls are in place | Current timing cannot be isolated | Medium | Medium | Lifecycle operator |
| Expand mobile/accessibility review across top-volume messages | Partial content sample | Medium | Medium | Email designer |

## Caveats and unverifiable checks

- Sender authentication settings were not exposed.
- Form targeting/frequency was not available through the installed tool set.
- The content sample was not sufficient for a comprehensive localization conclusion.
- No profile records or audience members were retrieved.

## Methodology

The example follows the repository's 100-point rubric. Maturity is normalized across verifiable checks; coverage is the share of rubric points with evidence; confidence adjusts covered points for evidence quality. Missing evidence is not scored as failure.
