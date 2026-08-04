# Lifecycle and flow playbooks

Evaluate relevance before scoring presence. The canonical set varies by business model, channel permissions, catalog, purchase cycle, and event availability.

## Core ecommerce journey

| Journey | Evidence of healthy coverage | Common audit risks |
| --- | --- | --- |
| Welcome | Live entry experience, consent-aware branching, clear objective, sensible exit/suppression logic | Single generic message, offer conflict, no buyer exclusion, channel mismatch |
| Browse abandonment | Eligible browse event, product context, frequency control, conversion exit | Excess reach, weak intent signal, overlap with cart/checkout |
| Cart abandonment | Reliable cart event, preserved item context, conversion exit, prioritized against lower-intent reminders | Duplicate reminders, broken product data, no suppression |
| Checkout abandonment | Reliable checkout-start event, urgency proportional to intent, order-complete exit | Incentive leakage, message collisions, missing conversion exit |
| Post-purchase | Order-aware timing, product/category branching where useful, education before cross-sell | Immediate promotion, no repeat-buyer logic, return/support conflict |
| Review or UGC request | Fulfilment-aware delay, eligibility and channel rules | Asking before delivery, repeated asks, missing exclusions |
| Replenishment | Product-specific expected-use window and repeat-purchase exit | Universal timing, irrelevant products, discount dependency |
| Win-back | Purchase-cycle-aware inactivity window and reactivation objective | Arbitrary inactivity, too many messages, no sunset handoff |
| Sunset or suppression | Engagement definition, warning path where appropriate, final suppression/permission outcome | Keeping chronically unengaged profiles marketable indefinitely |
| Back in stock / price drop | Catalog events, inventory/price context, permission and frequency rules | Stale catalog state, excessive alerts, absent exit criteria |

## Structural checks

For each applicable flow review:

- live/draft/manual status and last update;
- trigger and trigger filters;
- flow filters and profile/property conditions;
- message count, delays, time windows, and channel sequence;
- Smart Sending or equivalent frequency policy;
- conversion exits and overlap/exclusion logic;
- consent, locale, market, buyer, and VIP branching where relevant;
- UTM/tracking consistency;
- tests and sample-size sufficiency;
- delivered counts, clicks, conversions, attributed value, complaints, bounces, and unsubscribes;
- message-level outliers rather than only flow averages.

The skill must not prescribe exact delays or message counts as universal best practice. Tie recommendations to the purchase cycle, observed drop-off, audience tolerance, and testability.
