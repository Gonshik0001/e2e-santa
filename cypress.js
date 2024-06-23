{
    "testFiles": "**/*.spec.js",
    "integrationFolder": "cypress/integration",
    "video": false,
    "screenshotsFolder": "cypress/screenshots",
    "videosFolder": "cypress/videos",
    "reporter": "cypress-multi-reporters",
    "reporterOptions": {
      "reporterEnabled": "mocha-junit-reporter, mochawesome",
      "mochaJunitReporterReporterOptions": {
        "mochaFile": "results/junit/test-results-[hash].xml",
        "toConsole": true
      }
    }
  }
  
  