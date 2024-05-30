const { defineConfig } = require('cypress');
const createEsbuildPlugin = require('@bahmutov/cypress-esbuild-preprocessor');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Ваши настройки событий
    },
    baseUrl: 'https://santa-secret.ru/',
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
});

