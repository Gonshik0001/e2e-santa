const { defineConfig } = require('cypress');
const createEsbuildPlugin = require('@bahmutov/cypress-esbuild-preprocessor');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const cucumber = require('@badeball/cypress-cucumber-preprocessor');

module.exports = defineConfig({
  projectId: "n9h3ae",
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', createEsbuildPlugin());
      cucumber.addCucumberPreprocessorPlugin(on, config);
      allureWriter(on, config);
      return config;
    },
    baseUrl: 'https://santa-secret.ru/',
    specPattern: ['cypress/e2e/**/*.cy.js', 'cypress/e2e/**/*.feature'],
    supportFile: 'cypress/support/e2e.js',
  },
});
