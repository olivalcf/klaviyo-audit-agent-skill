# Audit data requirements

Collect the minimum aggregate evidence needed for the selected mode.

| Dimension | Minimum evidence | Better evidence | Unverifiable when |
| --- | --- | --- | --- |
| Flows and lifecycle | Complete flow inventory, status, trigger/category, flow report | Action/message structure, filters, timing, comparative period | Flow inventory or reporting is unavailable |
| Data and measurement | Account timezone, mapped metrics, primary conversion metric | Metric continuity, integration/tracking settings, preceding period | No trustworthy conversion metric can be selected |
| Deliverability and consent | Delivered, bounce, spam complaint, unsubscribe reporting | Domain/provider trends and consent configuration | Required aggregate rates are unavailable |
| Campaign program | Complete campaign inventory and campaign report | Audience, Smart Sending, test and message metadata | Campaign reporting is unavailable |
| Audience and segmentation | Complete list and segment inventories | Aggregate segment values/series and definitions | Audience inventory is unavailable |
| Forms and acquisition | Complete forms inventory and status | Aggregate views, submits, conversion, version history | Form tools are unavailable or no forms are used |
| Content and experimentation | Message/template inventory for sampled items | Subjects, preview text, channel, tests, tracking, rendering | Content tools are disabled or unsafe to inspect |

## Collection log

For each capability record:

- tool/capability used;
- filters and analysis window;
- pages retrieved and completion status;
- objects returned;
- observation timestamp;
- limitations or errors.

Do not score an inventory-dependent check until pagination is complete, unless the report explicitly labels it a sample.
