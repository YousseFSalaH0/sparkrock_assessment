const fs = require('node:fs');
const path = require('node:path');
const cases = require('../docs/case-index.json');
const featureDir = path.resolve(__dirname, '../cypress/e2e');
const files = fs.readdirSync(featureDir).filter((name) => name.endsWith('.feature'));
const features = files.map((name) => fs.readFileSync(path.join(featureDir, name), 'utf8'));
const ids = features.flatMap((text) => [...text.matchAll(/Scenario: (TC-\d+)/g)].map((m) => m[1]));
features.forEach((text) => {
  // Outline example rows start with a two-digit case ID. Each is one execution.
  for (const match of text.matchAll(/^\s*\| (\d{2}) \|/gm)) ids.push(`TC-${match[1]}`);
});
const expected = cases
  .filter((c) => !c.tags.includes('@manual'))
  .map((c) => c.id)
  .sort();
if (new Set(ids).size !== ids.length || JSON.stringify(ids.sort()) !== JSON.stringify(expected))
  throw new Error('Case-to-feature traceability mismatch');
if (cases.length !== 40 || cases.filter((c) => c.tags.includes('@fast')).length !== 5)
  throw new Error('Unexpected design scope');
console.log(
  '40 documented cases; 38 unique executable scenarios; 5 direct-setup scenarios; 2 manual cases.',
);
