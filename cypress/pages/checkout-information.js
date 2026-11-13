/** Checkout information screen. Input values are supplied by a named customer fixture. */
export const checkoutInformation = {
  expectLoaded() {
    cy.location('pathname').should('eq', '/checkout-step-one.html');
  },
  fill(details) {
    // Only input fields are typed; expectedError is assertion metadata.
    ['firstName', 'lastName', 'postalCode'].forEach((field) => {
      const value = details[field];
      cy.byTest(field).clear();
      // Empty strings deliberately leave a field blank; spaces are typed unchanged.
      // Do not trim negative-test data or parse user characters as Cypress key commands.
      if (value) cy.byTest(field).type(value, { parseSpecialCharSequences: false });
    });
  },
  continue() {
    cy.byTest('continue').click();
  },
  cancel() {
    cy.byTest('cancel').click();
  },
  expectError(message) {
    this.expectLoaded();
    cy.byTest('error').should('be.visible').and('have.text', `Error: ${message}`);
  },
  expectAnyError() {
    this.expectLoaded();
    cy.byTest('error').should('be.visible');
  },
};
