const fs = require('node:fs');
const path = require('node:path');
const cases = require('../docs/case-index.json');
const { generateMessages } = require('@cucumber/gherkin');
const featureDir = path.resolve(__dirname, '../cypress/e2e');
const files = fs.readdirSync(featureDir).filter((name) => name.endsWith('.feature'));
const features = files.map((name) => fs.readFileSync(path.join(featureDir, name), 'utf8'));
// Parse real Gherkin: malformed tables can otherwise disappear during tag filtering.
const ids = features.flatMap((text, index) => {
  let nextId = 0;
  const messages = generateMessages(text, files[index], 'text/x.cucumber.gherkin+plain', {
    includePickles: true,
    newId: () => String(nextId++),
  });
  const errors = messages.filter((message) => message.parseError);
  if (errors.length) throw new Error(JSON.stringify(errors));
  return messages
    .filter((message) => message.pickle)
    .map(({ pickle }) => {
      const match = pickle.name.match(/^TC-\d+/);
      if (!match) throw new Error('Missing test case ID: ' + pickle.name);
      // Documentation and actual inherited Examples tags must select the same cases.
      const documented = cases.find((test) => test.id === match[0]);
      const actualTags = pickle.tags.map((tag) => tag.name).sort();
      const documentedTags = documented?.tags.split(/\s+/).filter(Boolean).sort();
      if (JSON.stringify(actualTags) !== JSON.stringify(documentedTags))
        throw new Error('Suite tag mismatch: ' + match[0]);
      if (
        !actualTags.includes('@full-regression') ||
        (actualTags.includes('@smoke') && !actualTags.includes('@regression')) ||
        actualTags.some((tag) => !['@smoke', '@regression', '@full-regression'].includes(tag))
      )
        throw new Error('Invalid suite membership: ' + match[0]);
      return match[0];
    });
});
const expected = cases
  .filter((c) => !c.tags.includes('@manual'))
  .map((c) => c.id)
  .sort();
if (new Set(ids).size !== ids.length || JSON.stringify(ids.sort()) !== JSON.stringify(expected))
  throw new Error('Case-to-feature traceability mismatch');
if (
  cases.length !== 43 ||
  cases.filter((c) => c.file?.endsWith('05-focused-checkout.feature')).length !== 5
)
  throw new Error('Unexpected design scope');
console.log(
  '43 documented cases; 41 unique executable scenarios; 5 direct-setup scenarios; 2 manual cases.',
);
