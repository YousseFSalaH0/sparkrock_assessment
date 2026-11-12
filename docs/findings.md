# Findings requiring product clarification

These are observed behaviors evaluated against **proposed** requirements, not confirmed violations of an approved specification. The two cases intentionally remain red when the application permits the behavior.

## F-01 — Whitespace-only first name reaches order review

- Case: TC-37; proposed requirement A-03; suggested priority P1 if meaningful customer names are required.
- Preconditions: standard_user; Backpack in cart; customer information page.
- Reproduce: enter three spaces as first name, Tester as last name, 02108 as postal code; Continue.
- Expected under A-03: remain at customer information and show an actionable validation error.
- Actual: advances to `/checkout-step-two.html`.
- Impact hypothesis: unusable customer information may be accepted. This demo has no real fulfillment backend; downstream harm is not demonstrated.
- Clarification: should values be trimmed and validated as nonempty after trimming?
- Evidence: assumption run Cucumber report, TC-37 failure screenshot and video.

## F-02 — Empty cart reaches order review

- Case: TC-38; proposed requirement A-04; suggested priority P1 if nonempty orders are required.
- Preconditions: fresh standard-user session with no products.
- Reproduce: open cart; Checkout; enter Alex / Tester / 02108; Continue.
- Expected under A-04: empty order is blocked before review with guidance to add products.
- Actual: advances to `/checkout-step-two.html`; the guard assertion fails.
- Impact hypothesis: an empty-order path is exposed. The test stops at review and does not claim a real persisted order or payment occurred.
- Clarification: is empty-cart checkout intentionally allowed for training purposes?
- Evidence: assumption run Cucumber report, TC-38 failure screenshot and video.

## Engineering observations (not product defects)

- Direct document requests to checkout routes return HTTP 404 on the public static host. The five focused tests load `/` and set the browser route before React mounts instead of ignoring HTTP errors.
- No commerce API was identified in the official implementation. Browser-state setup and image HTTP stubbing are accurately labelled.
- Dependency audit after upgrades: zero high/critical findings; four moderate findings in development-only transitive dependencies. Audit evidence is retained locally. Do not force a major downgrade suggested by npm audit without checking compatibility.

Manual cases TC-39/40 remain unexecuted. Do not infer accessibility or responsive conformance from the automated regression result.
