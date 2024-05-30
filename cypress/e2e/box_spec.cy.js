const users = require("../fixtures/users.json");
const boxPage = require("../fixtures/pages/boxPage.json");
const generalElements = require("../fixtures/pages/general.json");
const dashboardPage = require("../fixtures/pages/dashboardPage.json");
const invitePage = require("../fixtures/pages/invitePage.json");
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../fixtures/pages/inviteeDashboardPage.json");
const { faker } = require('@faker-js/faker');

Cypress.Commands.add('customLogin', (email, password) => {
  cy.visit('/login');
  cy.get('[data-test=email]').type(email);
  cy.get('[data-test=password]').type(password);
  cy.get('[data-test=login-button]').click();
});

Cypress.Commands.add("addParticipant", (name, email) => {
  cy.get('input[name="name"]').type(name);
  cy.get('input[name="email"]').type(email);
  cy.get('button[id="add-participant"]').click();
});

describe("User can create a box and run it", () => {
  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
  let maxAmount = 50;
  let currency = "Евро";
  let inviteLink;

  it("User logins and creates a box", () => {
    cy.visit("/login");
    cy.customLogin(users.userAutor.email, users.userAutor.password);
    cy.contains("Создать коробку").click();
    cy.get(boxPage.boxNameField).type(newBoxName);
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.sixthIcon).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.giftPriceToggle).check({ force: true });
    cy.get(boxPage.maxAnount).type(maxAmount);
    cy.get(boxPage.currency).select(currency);
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);
    cy.get(".layout-1__header-wrapper-fixed .toggle-menu-item span")
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Участники");
        expect(text).to.include("Моя карточка");
        expect(text).to.include("Подопечный");
      });
  });

  it("Add participants", () => {
    cy.addParticipant('Gonshik0001', 'kulshaev@gmail.com');
    cy.addParticipant('Gonshik0002', 'kulshaev+1@gmail.com');
    cy.addParticipant('Gonshik0003', 'kulshaev+2@gmail.com');
    cy.addParticipant('Gonshik0004', 'kulshaev+3@gmail.com');
    cy.get(generalElements.submitButton).click();
    cy.get(invitePage.inviteLink)
      .invoke("text")
      .then((link) => {
        inviteLink = link;
      });
    cy.clearCookies();
  });

  it("Approve as user1", () => {
    cy.visit(inviteLink);
    cy.get(generalElements.submitButton).click();
    cy.contains("войдите").click();
    cy.customLogin(users.user1.email, users.user1.password);
    cy.contains("Создать карточку участника").should("exist");
    cy.get(generalElements.submitButton).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeBoxPage.wishesInput).type(wishes);
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeDashboardPage.noticeForInvitee)
      .invoke("text")
      .then((text) => {
        expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
      });
    cy.clearCookies();
  });

  it("Runs the draw", () => {
    cy.visit("/login");
    cy.customLogin(users.userAutor.email, users.userAutor.password);
    cy.get(dashboardPage.yourBox).contains(newBoxName).click();
    cy.get('[data-test=run-draw]').click();
    cy.contains('Draw was successful').should('be.visible');
  });

  after(() => {
    cy.request('POST', '/api/deleteBox', { id: 'boxId' })
      .then((response) => {
        expect(response.body).to.have.property('status', 'success');
      });
  });
});
