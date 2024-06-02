const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const cucumber = require('@badeball/cypress-cucumber-preprocessor');

module.exports = (on, config) => {
  allureWriter(on, config);
  cucumber.addCucumberPreprocessorPlugin(on, config);
  return config;
};
