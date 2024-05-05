Cypress.Commands.add('customLogin', (email, password) => {
    cy.visit('/login');
    cy.get('[data-test=email]').type(email);
    cy.get('[data-test=password]').type(password);
    cy.get('[data-test=login-button]').click();
  });