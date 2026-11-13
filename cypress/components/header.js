/** Shared header component, reused across screens instead of duplicated per page. */
export const header = {
  openCart() {
    return cy.byTest('shopping-cart-link').click();
  },
  expectBadge(count) {
    // The application removes the badge entirely when the cart becomes empty.
    if (count === 0) cy.byTest('shopping-cart-badge').should('not.exist');
    else cy.byTest('shopping-cart-badge').should('have.text', String(count));
  },
  logout() {
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').should('be.visible').click();
  },
};
