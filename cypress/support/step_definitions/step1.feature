import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I have a box named {string}', (boxName) => {
  cy.createBox(boxName); // предполагает наличие такой команды в Cypress
});

When('I add the following participants:', (dataTable) => {
  dataTable.hashes().forEach(participant => {
    cy.addParticipant(participant.name, participant.email);
  });
});

Then('I should see {string}', (message) => {
  cy.contains(message).should('be.visible');
});

Given('I have added participants', () => {
  // предполагаем, что участники уже добавлены, можно вставить шаги или использовать API
});

When('I initiate the draw', () => {
  cy.startDraw();
});

Then('the draw should start and participants are notified', () => {
  cy.verifyNotificationSent();
});
