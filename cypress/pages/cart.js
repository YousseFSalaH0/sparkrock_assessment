import { getProduct } from '../data/test-data';

/** Cart screen: verify complete contents, not merely a badge or one matching item. */
export const cart = {
  expectLoaded() {
    cy.location('pathname').should('eq', '/cart.html');
  },
  expectItems(keys) {
    const expectedNames = keys.map((key) => getProduct(key).name).sort();
    cy.get('.cart_item').should('have.length', keys.length);
    cy.get('.cart_item .inventory_item_name').should(($names) => {
      expect([...$names].map((node) => node.textContent).sort()).to.deep.equal(expectedNames);
    });
    keys.forEach((key) => {
      cy.contains('.cart_item', getProduct(key).name)
        .find('.cart_quantity')
        .should('have.text', '1');
    });
  },
  expectEmpty() {
    cy.get('.cart_item').should('not.exist');
  },
  remove(key) {
    cy.contains('.cart_item', getProduct(key).name).contains('button', 'Remove').click();
  },
  continueShopping() {
    cy.byTest('continue-shopping').click();
  },
  checkout() {
    cy.byTest('checkout').click();
  },
};
