# Sparkrock assessment — Sauce Demo UI automation

A risk-based UI test portfolio using **JavaScript, Cypress and Cucumber**. The project includes a full written design, reusable page/components/flows, data-driven scenarios, real network stubbing, CI, and a Cucumber HTML report.

## Start here

1. Read [test strategy](docs/test-strategy.md), [40 test cases](docs/test-cases.md), and [assumptions](docs/assumptions.md).
2. Review [actual execution results](docs/execution-results.md), not just the test descriptions.
3. Use Node.js 22.18 or newer. The Desktop delivery includes a local Node 22 runtime; in PowerShell run `. .\use-local-node.ps1` first. This changes only the current terminal session. For a fresh Git clone, install Node 22 LTS normally. package-lock.json pins the tested dependencies.
4. Run:

```sh
npm ci
npm run lint
npm run check:coverage
npm test
npm run report:serve
```

Open http://127.0.0.1:8088 after the final command. Alternatively open `reports/current/html/index.html` directly. Stop the report server with Ctrl+C.

## Commands

| Command                                | Purpose                                                             |
| -------------------------------------- | ------------------------------------------------------------------- |
| `npm test` / `npm run test:regression` | 36 baseline scenarios; excludes proposed-rule checks                |
| `npm run test:all`                     | All 38 executable cases, including assumption failures              |
| `npm run test:assumptions`             | Two proposed acceptance criteria; failures may be expected findings |
| `npm run test:smoke`                   | Four critical purchase/access/recovery scenarios                    |
| `npm run test:fast`                    | Five focused checkout cases with browser-state setup                |
| `npm run test:network`                 | Real image request substitution and 404 resilience                  |
| `npm run test:recording`               | Suggested pair TC-26 and TC-29; change tags after choosing          |
| `npm run test:chrome` / `test:edge`    | Baseline in an installed Chrome/Edge browser                        |
| `npm run cy:open`                      | Interactive Cypress runner                                          |
| `npm run report`                       | Regenerate HTML from the latest Cucumber JSON                       |
| `npm run report:serve`                 | Serve latest report on loopback port 8088                           |
| `npm run lint` / `format:check`        | Static checks                                                       |
| `npm run check:coverage`               | Verify case IDs and one-to-one executable traceability              |

The runner archives `reports/current` before a new run, preserving previous evidence in `reports/archive`. It returns a nonzero exit code for failed, skipped, pending, zero-test or startup-error runs. Reports are generated even after assertion failures. Run commands sequentially: parallel runs would compete for the same report paths.

## Architecture

```text
cypress/e2e/*.feature        Business scenarios, tags and Examples tables
cypress/steps/               Gherkin bindings and business assertions
cypress/flows/               Composed shopping journeys
cypress/pages/               Login, catalog, checkout and shared components
cypress/support/            Stable selectors and narrowly scoped setup command
cypress/fixtures/           Products, synthetic customer and mock image
scripts/                    Run orchestration, report generation and coverage check
docs/                       Strategy, cases, assumptions, findings, recording guide
.github/workflows/          CI execution and evidence retention
```

All tests are independent. Most use UI login/cart setup. Exactly five `@fast` scenarios set the application's session cookie and cart local storage before it mounts. This is **not API authentication**. Sauce Demo's commerce data is client-side; see [network investigation](docs/network-investigation.md). Two `@network` cases intercept a real product image request. No fabricated API endpoints or injected fake checkout application are used.

Expected prices come from a versioned fixture rather than being copied from the UI being asserted. The assumed tax rule is documented. Only public demo credentials and synthetic customer details are used; do not put personal credentials in fixtures.

## Evidence and limitations

The default profile covers 36 cases. Two additional proposed-rule cases are deliberately isolated, not skipped or silently marked passing. Two manual cases remain **not executed**. A green automated report does not imply complete accessibility, security, performance or payment coverage. This public demo has no real payment or order persistence integration.

Screenshots and videos are under the run folder. Cucumber JSON/NDJSON and `run-summary.json` are the machine-readable records. CI uploads the entire current run folder even when tests fail. Generated artifacts and node_modules are excluded from Git; the Desktop handover includes local reports for review.

## Recording and submission

Use [recording guide](docs/recording-guide.md) after choosing two cases. This repository is a prepared reference implementation. During the recording, actually recreate the selected implementation, explain the decisions, and execute the tests; describe the framework preparation accurately. Cypress execution videos are debugging evidence, **not** the required narrated live-coding video.

Publishing the repository and video and submitting their URLs are separate final steps. No assessment form is submitted by this project.
