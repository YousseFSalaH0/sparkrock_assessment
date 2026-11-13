# Sparkrock assessment — Sauce Demo UI automation

A risk-based UI test portfolio using **JavaScript, Cypress and Cucumber**. The project includes a full written design, reusable page/components/flows, data-driven scenarios, real network stubbing, CI, and a Cucumber HTML report.

## Start here

1. Read [test strategy](docs/test-strategy.md), [43 test cases](docs/test-cases.md), and [assumptions](docs/assumptions.md).
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

| Command                                             | Purpose                                                                            |
| --------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `npm run test:smoke`                                | Four critical journeys                                                             |
| `npm test` / `npm run test:regression`              | 29 common positive and negative scenarios                                          |
| `npm run test:full-regression` / `npm run test:all` | All 41 automated scenarios, including corners and two known proposed-rule failures |
| `npm run test:chrome` / `npm run test:edge`         | Regression using the selected installed browser                                    |
| `npm run cy:open`                                   | Interactive test runner                                                            |
| `npm run report` / `npm run report:serve`           | Generate or serve the current HTML report                                          |
| `npm run lint` / `npm run format:check`             | Static checks                                                                      |
| `npm run check:coverage`                            | Verify 43 documented cases and 41 executable cases                                 |

The runner archives `reports/current` before a new run, preserving previous evidence in `reports/archive`. It returns a nonzero exit code for failed, skipped, pending, zero-test or startup-error runs. Reports are generated even after assertion failures. Run commands sequentially: parallel runs would compete for the same report paths.

## Architecture

```text
cypress/e2e/*.feature        Business scenarios, tags and Examples tables
cypress/steps/               Gherkin bindings and business assertions
cypress/flows/               Composed shopping journeys
cypress/pages/               One object per screen (including three checkout screens)
cypress/support/            Stable selectors and narrowly scoped setup command
cypress/fixtures/           Named products, baskets, customers, credentials and network cases
scripts/                    Run orchestration, report generation and coverage check
docs/                       Strategy, cases, assumptions, findings, recording guide
.github/workflows/          CI execution and evidence retention
```

All tests are independent. Most use UI login/cart setup. Exactly five `focused-checkout` scenarios set the application's session cookie and cart local storage before it mounts. This is **not API authentication**. Sauce Demo's commerce data is client-side; see [network investigation](docs/network-investigation.md). Two `network-response` cases intercept a real product image request. No fabricated API endpoints or injected fake checkout application are used.

Expected prices come from a versioned fixture rather than being copied from the UI being asserted. The assumed tax rule is documented. Only public demo credentials and synthetic customer details are used; do not put personal credentials in fixtures.

## Evidence and limitations

The default regression profile covers 29 common cases. Full regression covers all 41 automated cases, including 12 additional corner or proposed-rule cases. Two proposed rules currently fail and are not silently marked passing. Two manual cases remain **not executed**. A green automated report does not imply complete accessibility, security, performance or payment coverage. This public demo has no real payment or order persistence integration.

Screenshots and videos are under the run folder. Cucumber JSON/NDJSON and `run-summary.json` are the machine-readable records. CI uploads the entire current run folder even when tests fail. Generated artifacts and node_modules are excluded from Git; the Desktop handover includes local reports for review.

## Recording and submission

Use [recording guide](docs/recording-guide.md) after choosing two cases. This repository is a prepared reference implementation. During the recording, actually recreate the selected implementation, explain the decisions, and execute the tests; describe the framework preparation accurately. Cypress execution videos are debugging evidence, **not** the required narrated live-coding video.

Publishing the repository and video and submitting their URLs are separate final steps. No assessment form is submitted by this project.

## Named login data

`cypress/fixtures/credentials.json` contains named public-demo credential objects: `validUser`, `wrongPassword`, `wrongUsername`, `emptyUsername`, `emptyPassword`, `bothEmpty`, `lockedUser`, and `bothWrong`. Use `When I log in using "validUser" credentials` or select a key through the Scenario Outline. One `loginWithFixture(name)` function loads the object and passes it to `login.submit({ username, password })`. Expected validation errors are stored as expectedError in the same named credential or customer dataset.

## Data and step organization

Each feature has a matching step-definition file; common.steps.js holds shared navigation bindings. Cucumber registers all files globally, so shared steps are defined once. Page objects cover login, catalog, product details, cart, checkout information, checkout review and checkout completion. The shared header lives in components/. Reusable journeys live in flows/.

Product names and prices are defined once in products.json. Scenario keys such as backpack and basket keys such as twoProducts resolve through data/test-data.js. Customer, sorting and network variants are also named fixtures. Product detail coverage now runs for three products. Expected error messages come from the selected dataset, and selectors/routes remain in the page objects.

## Suite selection and validation data

Only three execution tags are used: @smoke, @regression and @full-regression. Smoke is included in regression, which is included in full regression. Routine invalid passwords and missing individual fields remain in regression; combined invalid inputs, empty/all-item cart boundaries, rounding, international inputs, network failures and proposed-rule checks receive full-regression coverage. Examples blocks can carry tags so different rows in one Outline belong to different suites.

Both inputs and expectedError live in named fixture objects. For example, wrongPassword selects its username, password and expected rejection text; missingPostalCode selects its customer fields and expected checkout message. A missing expectedError fails clearly. Data-driven execution is provided by Scenario Outline and Examples without a separate tag.

## Recording pair

`npm run test:recording` selects only checkout scenarios carrying @smoke: TC-26 and TC-29. It uses the normal archive and report pipeline and expects exactly two cases. This command records automated execution evidence, not microphone narration or editor activity.
