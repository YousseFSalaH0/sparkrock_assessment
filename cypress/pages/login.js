/** Login screen owns credential entry and both authenticated-error and logged-out checks. */
export const login = {
  visit() {
    cy.visit('/');
  },
  submit({ username, password }) {
    // Clear first so the same action supports retries with different data sets.
    // Empty strings intentionally exercise required-field validation.
    cy.byTest('username').clear();
    cy.byTest('password').clear({ log: false });
    if (username) cy.byTest('username').type(username);
    if (password) cy.byTest('password').type(password, { log: false });
    return cy.byTest('login-button').click();
  },
  expectUnauthenticated() {
    cy.location('pathname').should('eq', '/');
    cy.byTest('login-button').should('be.visible');
    cy.byTest('inventory-list').should('not.exist');
  },
  // Match the required error and remain on login; text alone could match a stale toast.
  expectError(message) {
    cy.byTest('error').should('be.visible').and('have.text', `Epic sadface: ${message}`);
    cy.location('pathname').should('eq', '/');
    cy.byTest('login-button').should('be.visible');
  },
};
