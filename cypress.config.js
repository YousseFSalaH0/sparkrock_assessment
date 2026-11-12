const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 800,
  video: true,
  screenshotOnRunFailure: true,
  screenshotsFolder: 'reports/current/screenshots',
  videosFolder: 'reports/current/videos',
  downloadsFolder: 'reports/current/downloads',
  // Do not hide intermittent failures with retries in the assessment evidence.
  retries: 0,
  defaultCommandTimeout: 8000,
  pageLoadTimeout: 60000,
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    testIsolation: true,
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({ plugins: [createEsbuildPlugin(config)] }));
      return config;
    },
  },
});
