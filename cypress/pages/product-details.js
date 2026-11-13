import { getProduct } from '../data/test-data';

/** Product-details screen: the same assertions apply to every Examples dataset. */
export const productDetails = {
  expectProduct(key) {
    const { id, name, price } = getProduct(key);
    cy.location('pathname').should('eq', '/inventory-item.html');
    cy.location('search').should('eq', `?id=${id}`);
    cy.byTest('inventory-item-name').should('have.text', name);
    cy.byTest('inventory-item-price').should('have.text', `$${price.toFixed(2)}`);
    cy.byTest('inventory-item-desc').invoke('text').should('not.be.empty');
  },
  backToProducts() {
    cy.byTest('back-to-products').click();
  },
};
