# Reporting semantics

## Choose the right clock

Klaviyo campaign and flow reports attribute downstream performance to sends or messages according to Klaviyo's reporting model. Generic metric aggregates group events by event time. They are not interchangeable.

- Use campaign reports for campaign open, click, deliverability, conversion, and attributed-value comparisons.
- Use flow reports for flow/message open, click, deliverability, conversion, and attributed-value comparisons.
- Use metric aggregates for event continuity, store-wide trends, integration health, and questions explicitly framed by event time.

Never add report-attributed conversions to raw conversion events as if they were disjoint totals.

## Denominators

Preserve returned denominators. State whether a rate is per recipient, delivered message, opened message, session, view, or submit. If the MCP returns a rate without enough metadata to establish the denominator, use the value descriptively and lower confidence.

## Windows

- Use complete days in the account timezone.
- Compare equal-length adjacent periods.
- Label incomplete reporting windows.
- Avoid judging low-volume objects from unstable rates; include counts beside rates.
- Record the conversion metric and attribution settings returned or known. If settings cannot be retrieved, state that the report follows Klaviyo's current account attribution.

## Aggregation

Roll up only like-for-like records. Weight aggregate rates by their underlying denominators when the counts are available. Do not average percentages directly across messages or campaigns.

## Revenue

Call the value “Klaviyo-attributed revenue” or “attributed conversion value” when it comes from Klaviyo reporting. Do not call it incremental revenue. Incrementality requires an experiment or causal design.
