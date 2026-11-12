# Test strategy

## Objective and scope

Demonstrate UI test design, precise cases and maintainable automation for the public Sauce Demo shopping flow. This is a portfolio against a demo, not certification of a production commerce service. The product owner supplied no user stories; reconstructed expectations and proposed business rules are explicit in assumptions.md.

Scope: authentication, six-product catalog, four sorts, details, cart CRUD/navigation/persistence, customer validation, order totals, completion, and image dependency resilience. Documented manual checks cover keyboard/screen-reader behavior and responsive/zoom usability. Excluded: real payments, backend authorization, inventory concurrency, persisted order verification, load testing, full WCAG compliance, third-party social sites and intentionally broken demo-user modes beyond locked-out login. Additional dynamic-catalog demo pages are outside the agreed shopping journey.

## Risk-based selection

P0: access guard, purchase completion, totals and recovery. P1: lost cart state, wrong item, missing mandatory information and cancellation. P2: sorting, secondary display and image resilience. Prioritize critical customer outcomes rather than accumulating similar clicks.

The design has 40 cases: 36 baseline automation, 2 proposed-rule automation, 2 manual. Boundary coverage includes zero/one/all six catalog items, missing fields, decimal rounding, international names and leading-zero postal values. Without specified maximum lengths or postal formats, do not invent arbitrary validation limits. Extend cases after clarification.

## Techniques

- Equivalence classes: valid/invalid/locked/missing credentials; populated/missing checkout fields.
- Boundary selection: empty cart, final item removal, complete catalog, whitespace-only name and cent rounding.
- State transitions: catalog to cart to information to review to completion; cancel/logout/reload.
- Data-driven outlines: six credential examples, four sort examples, three required-field examples; each row maps to a unique TC ID.
- Fault injection: deterministic replacement image and unavailable image via a real intercepted GET.
- Independent oracles: fixture-based item identity/prices, integer-cent subtotal/tax calculation, exact error and navigation checks.

## Architecture and reliability

Use data-test hooks where present and existing stable IDs for the menu. Scope product operations to their cards to avoid index-dependent actions. Business steps delegate reusable interactions to page objects; flows compose common journeys. Keep assertions explicit and avoid a generic click-everything abstraction.

Cypress test isolation resets cookies/storage between scenarios. No shared order dependency, arbitrary sleeps, blanket exception suppression, force-click defaults or pass-on-error handling. Cypress retryable DOM assertions synchronize rendering. Network tests wait on an actual aliased request and assert response plus UI effect. Automatic retries are disabled so failures remain visible.

Exactly TC-30–34 bypass setup by seeding known browser state before React mounts. They are white-box focused UI tests, not full E2E or API tests. TC-29 retains the complete UI journey. No cy.session cache is added to the rest of the suite because it would obscure the agreed distinction between the five fast cases and UI-driven setup.

## Environment and execution

Target https://www.saucedemo.com; desktop 1280x800; Chrome baseline. Optional installed Chrome/Edge profiles. Dependency versions are pinned; use npm ci for reproduction. Public-site changes and availability are external risks. Browser diversity is only claimed for actually executed runs. CI workflow is supplied; its cloud execution is not claimed until run on GitHub.

Entry: site reachable, dependencies installed, fixtures reviewed, assumptions recorded. Exit for baseline: all 36 cases pass without skipped/pending tests, report generated, diagnostics retained. Assumption checks and manual status are reported separately. A baseline green result never closes a proposed-rule finding automatically.

## Reporting and triage

Each scenario/example has a TC ID shared with the design. The runner preserves older runs and generates Cucumber HTML after failures as well as passes. Startup errors have explicit evidence rather than an empty green report. Review raw JSON/NDJSON and screenshots/videos when diagnosing a failure. Classify as product behavior, proposed-requirement gap, test defect or environment issue before calling it a confirmed bug.

## Requirement clarification backlog

Confirm whitespace trimming, empty-cart checkout policy, tax jurisdiction/rate, postal validation and maximum lengths, intended supported browsers, mobile support and accessibility target. These questions are not answered by the current demo implementation alone.
