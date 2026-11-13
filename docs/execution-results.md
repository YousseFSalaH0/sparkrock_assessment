# Verified execution results

Executed on 2026-11-13 against https://www.saucedemo.com using Cypress 16.3.0, Chrome 155.0.8059.85 headless, Node 22.23.5 and Windows.

## Regression

- Command: `npm test` after `. .\use-local-node.ps1`.
- Started 2026-11-13T13:51:20.472Z; ended 2026-11-13T13:52:35.783Z (UTC).
- **29 passed, 0 failed, 0 pending, 0 skipped.** Selection matched the documented @regression membership, including tagged Examples rows.
- [Regression HTML](../reports/current/html/index.html) and [run summary](../reports/current/run-summary.json).

## Full regression

- Command: `npm run test:full-regression`.
- Started 2026-11-13T13:49:15.318Z; ended 2026-11-13T13:51:08.386Z (UTC).
- **41 executed: 39 passed, 2 failed, 0 pending, 0 skipped.** Selection matched @full-regression.
- TC-37 failed because whitespace-only first name reaches review.
- TC-38 failed because empty-cart checkout reaches review.
- These are proposed requirements A-03/A-04, not confirmed violations of supplied requirements. The runner correctly returns a nonzero exit code.
- [Full regression HTML](../reports/full-regression/html/index.html) and [run summary](../reports/full-regression/run-summary.json). Failure screenshots, videos and Cucumber JSON/NDJSON are in the same folder.

Both runs verify the named product/customer/credential fixtures, dataset-based expected validation errors, per-screen page objects and feature-specific step definitions. Full regression includes three product detail datasets, five focused checkout setups and two network response cases.

## Checks and limitations

- ESLint, formatting and 43-case/41-scenario traceability checks pass. The coverage check also verifies actual inherited tags against documented tags and checks suite nesting.
- Smoke comprises four cases included in both executed suites; no separate smoke-only run is claimed.
- TC-39/40 are manual and **not executed**.
- Edge and GitHub Actions are configured but not claimed as executed.
- HTML reports were regenerated and their files verified; browser preview was checked during the earlier delivery.
- Older reports in archive/ and assumptions/ are historical evidence from earlier suite organization.
- Dependency audit from the earlier delivery: zero high/critical and four moderate transitive development findings; no new dependency changes in this refactor.

The current report changes on later runs. The runner archives earlier reports before execution.
