export const login = {
  visit() {
    cy.visit('/');
  },
  submit(username = 'standard_user', password = 'secret_sauce') {
    // Empty strings intentionally exercise required-field validation.
    if (username) cy.byTest('username').type(username);
    if (password) cy.byTest('password').type(password, { log: false });
    cy.byTest('login-button').click();
  },
  expectError(message) {
    cy.byTest('error').should('be.visible').and('have.text', `Epic sadface: ${message}`);
    cy.location('pathname').should('eq', '/');
    cy.byTest('login-button').should('be.visible');
  },
};
