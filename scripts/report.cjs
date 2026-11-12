const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
async function generateReport(runDirectory = 'current') {
  const reporter = await import('multiple-cucumber-html-reporter');
  const root = path.resolve(__dirname, '../reports', runDirectory);
  const summary = JSON.parse(fs.readFileSync(path.join(root, 'run-summary.json'), 'utf8'));
  // Cypress's successful module result has counts rather than a status field.
  // Derive the report outcome from those counts, including selection integrity.
  if (summary.totalTests !== undefined) {
    summary.status =
      summary.totalFailed ||
      summary.totalPending ||
      summary.totalSkipped ||
      summary.totalTests === 0 ||
      summary.selectionMatchesDesign === false
        ? 'failed'
        : 'passed';
    fs.writeFileSync(path.join(root, 'run-summary.json'), JSON.stringify(summary, null, 2));
  }
  await reporter.generate({
    jsonDir: path.join(root, 'json'),
    reportPath: path.join(root, 'html'),
    reportName: 'Sparkrock assessment | Sauce Demo',
    pageTitle: 'Cucumber execution evidence',
    displayDuration: true,
    durationInMS: false,
    openReportInBrowser: false,
    metadata: {
      browser: { name: summary.browser, version: summary.browserVersion || 'see run summary' },
      device: 'Desktop',
      platform: { name: process.platform, version: os.release() },
    },
    customData: {
      projectName: 'Sparkrock assessment / Sauce Demo',
      testCycle: summary.profile,
      environment: summary.baseUrl,
      startedAt: summary.startedAt,
      endedAt: summary.endedAt,
      outcome: summary.status,
      scenarios: `${summary.totalPassed} passed / ${summary.totalFailed} failed / ${summary.totalTests} total`,
      selectionMatchesDesign: String(summary.selectionMatchesDesign),
    },
  });
}
module.exports = { generateReport };
if (require.main === module)
  generateReport(process.argv[2] || 'current').catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
