/** Confirmation screen is separate from order review because it has its own outcome. */
export const checkoutComplete = {
  expectConfirmed() {
    cy.location('pathname').should('eq', '/checkout-complete.html');
    cy.byTest('complete-header').should('have.text', 'Thank you for your order!');
    cy.byTest('back-to-products').should('be.visible');
  },
  backToProducts() {
    cy.byTest('back-to-products').click();
  },
};
