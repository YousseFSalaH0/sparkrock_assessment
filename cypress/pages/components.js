export const header = {
  openCart() {
    cy.byTest('shopping-cart-link').click();
  },
  expectBadge(count) {
    if (count === 0) cy.byTest('shopping-cart-badge').should('not.exist');
    else cy.byTest('shopping-cart-badge').should('have.text', String(count));
  },
  logout() {
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').should('be.visible').click();
  },
};

export const cart = {
  expectItems(names) {
    cy.get('.cart_item').should('have.length', names.length);
    names.forEach((name) => {
      cy.contains('.cart_item', name)
        .should('be.visible')
        .find('.cart_quantity')
        .should('have.text', '1');
    });
  },
  remove(name) {
    cy.contains('.cart_item', name).contains('button', 'Remove').click();
  },
};
