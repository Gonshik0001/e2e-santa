import axios from 'axios';
import { resolve } from 'path';

export default {
  // Остальная конфигурация Cypress

  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mocha-junit-reporter, mochawesome',
    mochaJunitReporterReporterOptions: {
      mochaFile: 'results/junit/test-results-[hash].xml',
      toConsole: true,
    },
  },
};
