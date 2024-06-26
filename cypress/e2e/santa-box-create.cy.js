const users = require("../fixtures/users.json");
const boxPage = require("../fixtures/pages/boxPage.json");
const generalElements = require("../fixtures/pages/general.json");
const dashboardPage = require("../fixtures/pages/dashboardPage.json");
const invitePage = require("../fixtures/pages/invitePage.json");
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../fixtures/pages/inviteeDashboardPage.json");
const { faker } = require('@faker-js/faker');

import { faker } from "@faker-js/faker";


Cypress.Commands.add('customLogin', (email, password) => {
  cy.visit('/login');
  cy.get('[data-test=email]').type(email);
  cy.get('[data-test=password]').type(password);
  cy.get('[data-test=login-button]').click();
});

describe("user can create a box and run it", () => {
  //пользователь 1 логинится
  //пользователь 1 создает коробку
  //пользователь 1 получает приглашение
  //пользователь 2 переходит по приглашению
  //пользователь 2 заполняет анкету
  //пользователь 3 переходит по приглашению
  //пользователь 3 заполняет анкету
  //пользователь 4 переходит по приглашению
  //пользователь 4 заполняет анкету
  //пользователь 1 логинится
  //пользователь 1 запускает жеребьевку
  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
  let maxAmount = 50;
  let currency = "Евро";
  let inviteLink;
 
  it("user logins and create a box", () => {
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
  Cypress.Commands.add("addParticipant", (name, email) => {
    cy.get('input[name="name"]').type(name);
    cy.get('input[name="email"]').type(email);
    cy.get('button[id="add-participant"]').click();
  });
  it('Добавляет всех участников', () => {
    cy.addParticipant('Иван Иванов', 'ivan@example.com');
    cy.addParticipant('Петр Петров', 'petr@example.com');
    // Добавить других участников по аналогии
  });
  
  describe('Manage Box Participants', () => {
    it('should add participants to the box', () => {
      cy.addParticipant('Gonshik0001', 'kulshaev@gmail.com');
      cy.addParticipant('Gonshik0002', 'kulshaev+1@gmail.com');
      cy.addParticipant('Gonshik0003', 'kulshaev+2@gmail.com');
      cy.addParticipant('Gonshik0004', 'kulshaev+3@gmail.com');
            // Добавьте других участников по аналогии
    });
  });

  it("add participants", () => {
    cy.get(generalElements.submitButton).click();
    cy.get(invitePage.inviteLink)
      .invoke("text")
      .then((link) => {
        inviteLink = link;
      });
    cy.clearCookies();
  });
  it("approve as user1", () => {
    cy.visit(inviteLink);
    cy.get(generalElements.submitButton).click();
    cy.contains("войдите").click();
    cy.login(users.user1.email, users.user1.password);
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

  after("delete box", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.get(
      '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account/boxes"] > .header-item > .header-item__text > .txt--med'
    ).click();
    cy.get(":nth-child(1) > a.base--clickable > .user-card").first().click();
    cy.get(
      ".layout-1__header-wrapper-fixed > .layout-1__header-secondary > .header-secondary > .header-secondary__right-item > .toggle-menu-wrapper > .toggle-menu-button > .toggle-menu-button--inner"
    ).click();
    cy.contains("Архивация и удаление").click({ force: true });
    cy.get(":nth-child(2) > .form-page-group__main > .frm-wrapper > .frm").type(
      "Удалить коробку"
    );
    cy.get(".btn-service").click();
  });
  //запуск жеребьевки
  it('Запускает жеребьевку', () => {
    cy.get('button[id="start-draw"]').click();
    cy.contains('Жеребьевка запущена').should('be.visible');
  });
  

  it('should run the draw', () => {
    cy.get('[data-test=run-draw]').click();
    cy.contains('Draw was successful').should('be.visible');
  });
  after(() => {
    cy.request({
      method: 'DELETE',
      url: `/api/box/${boxId}`, // Убедитесь, что у вас есть доступ к boxId
      headers: {
        'Authorization': `Bearer ${yourToken}`
      }
    });
  });
  after(() => {
    cy.request('POST', '/api/deleteBox', { id: 'boxId' })
      .then((response) => {
        expect(response.body).to.have.property('status', 'success');
      });
  });
  
});


