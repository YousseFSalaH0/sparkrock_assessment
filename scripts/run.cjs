require('./check-coverage.cjs');
const fs = require('node:fs');
const path = require('node:path');
const cypress = require('cypress');
const { generateReport } = require('./report.cjs');

// Suite membership is explicit in Gherkin; full regression includes corner cases
// and the two proposed-requirement checks, whose known failures stay visible.
const profiles = {
  regression: '@regression',
  smoke: '@smoke',
  'full-regression': '@full-regression',
  all: '@full-regression',
};
const cases = require('../docs/case-index.json');
const expectedCounts = Object.fromEntries(
  Object.entries(profiles).map(([name, tag]) => [
    name,
    cases.filter((test) => test.tags.split(/\s+/).includes(tag)).length,
  ]),
);
async function main() {
  const profile = process.argv[2] || 'regression';
  const browser = process.argv[3] || 'chrome';
  if (!(profile in profiles)) throw new Error(`Unknown profile: ${profile}`);
  const reports = path.resolve(__dirname, '../reports');
  const current = path.join(reports, 'current');
  fs.mkdirSync(reports, { recursive: true });
  // Preserve earlier evidence instead of merging old scenarios into a new report.
  if (fs.existsSync(current)) {
    fs.mkdirSync(path.join(reports, 'archive'), { recursive: true });
    fs.renameSync(current, path.join(reports, 'archive', `${Date.now()}`));
  }
  fs.mkdirSync(path.join(current, 'json'), { recursive: true });
  const startedAt = new Date().toISOString();
  let result;
  try {
    // Cypress 16 separates browser-visible non-secret settings into expose.
    // Cucumber 28 reads tag expressions from that configuration namespace.
    result = await cypress.run({ browser, config: { expose: { tags: profiles[profile] } } });
  } catch (error) {
    fs.writeFileSync(path.join(current, 'startup-error.txt'), error.stack);
    throw error;
  } finally {
    const metadata = {
      profile,
      browser,
      startedAt,
      endedAt: new Date().toISOString(),
      baseUrl: process.env.CYPRESS_BASE_URL || 'https://www.saucedemo.com',
      totalTests: result?.totalTests,
      totalPassed: result?.totalPassed,
      totalFailed: result?.totalFailed,
      totalPending: result?.totalPending,
      totalSkipped: result?.totalSkipped,
      expectedTests: expectedCounts[profile],
      selectionMatchesDesign: result?.totalTests === expectedCounts[profile],
      browserVersion: result?.browserVersion,
      status:
        result?.totalTests === undefined
          ? 'startup-error'
          : result.totalFailed ||
              result.totalSkipped ||
              result.totalPending ||
              result.totalTests !== expectedCounts[profile]
            ? 'failed'
            : 'passed',
    };
    fs.writeFileSync(path.join(current, 'run-summary.json'), JSON.stringify(metadata, null, 2));
    // Failed assertions still produce reports. Missing results never masquerade as a pass.
    if (fs.existsSync(path.join(current, 'json/cucumber.json'))) await generateReport();
  }
  if (
    result.status === 'failed' ||
    !result.totalTests ||
    result.totalTests !== expectedCounts[profile] ||
    result.totalFailed ||
    result.totalSkipped ||
    result.totalPending
  )
    process.exitCode = 1;
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
