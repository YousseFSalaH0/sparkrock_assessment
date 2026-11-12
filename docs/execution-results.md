# Verified execution results

Executed on 2026-11-12 from `C:/Users/Youssef/OneDrive/Desktop/sparkrock_assessment` against https://www.saucedemo.com.

## Baseline regression

- Command: `npm test` after `. .\use-local-node.ps1`.
- Cypress 16.3.0; Chrome 155.0.8059.85 (headless); Node 22.23.5; Windows.
- Started: 2026-11-12T17:25:01.735Z. Ended: 2026-11-12T17:26:21.069Z (UTC).
- **36 passed, 0 failed, 0 pending, 0 skipped.** Executed count matched the designed profile.
- Includes five direct-setup cases and two real image-interception cases.
- Report: [baseline Cucumber HTML](../reports/current/html/index.html).
- Raw evidence: [run summary](../reports/current/run-summary.json), [Cucumber JSON](../reports/current/json/cucumber.json), NDJSON and six spec videos in the same run folder.

## Proposed-requirement checks

- Command: `npm run test:assumptions`.
- Same Chrome/Node/Cypress environment; two selected cases, no pending/skipped cases.
- Started: 2026-11-12T17:23:26.186Z. Ended: 2026-11-12T17:24:24.980Z (UTC).
- **0 passed, 2 failed** against explicitly proposed requirements A-03 and A-04.
- TC-37: whitespace-only first name reaches review.
- TC-38: empty cart reaches review.
- Report: [assumption Cucumber HTML](../reports/assumptions/html/index.html). Screenshots, video and raw results are retained in that folder.
- These are unconfirmed requirement gaps, not claimed violations of supplied business requirements. See [findings](findings.md).

## Checks and limitations

- ESLint and the 40-case/38-scenario traceability check pass.
- The five focused cases were separately verified in Chrome before the full regression.
- Report generation was verified for both passing and failing runs. The local report preview was checked in the browser, including charts and feature navigation.
- TC-39/40 are manual and **not executed**. No manual pass status is implied.
- Edge execution and GitHub Actions execution are configured but not claimed as tested.
- Earlier development runs in `reports/archive` include setup/configuration failures; they are troubleshooting history, not the final acceptance result.
- Dependency audit: zero high/critical and four moderate transitive development dependency findings. Details in the local `reports/dependency-audit.json` file.

Reports/current changes on subsequent runs. The runner archives the previous current run. This document records the delivered verification and should be updated after substantive changes.
