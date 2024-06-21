module.exports = defineConfig({
  projectId: "n9h3ae",
  e2e: {
    async setupNodeEvents(on, config) {
      // Настройка preprocessor для esbuild
      on('file:preprocessor', createEsbuildPlugin());
      
      // Добавление плагина cucumber
      await cucumber(on, config);

      // Настройка плагина allure
      allureWriter(on, config);
      allureCypress(on);

      return config;
    },
    baseUrl: 'https://santa-secret.ru/',
    specPattern: ['cypress/e2e/**/*.cy.js', 'cypress/e2e/**/*.feature'],
    supportFile: 'cypress/support/e2e.js',
  },
  reporter: 'mocha-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mocha-junit-reporter, spec',
    mochaJunitReporterReporterOptions: {
      mochaFile: 'results/test-results.xml',
    },
  },
});
