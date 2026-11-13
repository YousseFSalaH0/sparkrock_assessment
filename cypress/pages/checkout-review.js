import { getProduct } from '../data/test-data';
import businessRules from '../fixtures/business-rules.json';

/** Order-review screen. Pricing assertions use a versioned external oracle. */
export const checkoutReview = {
  expectOrder(keys) {
    cy.location('pathname').should('eq', '/checkout-step-two.html');
    cy.get('.cart_item').should('have.length', keys.length);
    keys.forEach((key) => {
      const { name, price } = getProduct(key);
      cy.contains('.cart_item', name)
        .find('.inventory_item_price')
        .should('have.text', `$${price.toFixed(2)}`);
    });
    // Integer cents avoid floating-point drift. A-02 explicitly defines the tax
    // assumption; the rate is not discovered from the same UI we are validating.
    const cents = keys.reduce((sum, key) => sum + Math.round(getProduct(key).price * 100), 0);
    const tax = Math.round(cents * businessRules.taxRate);
    cy.byTest('subtotal-label').should('have.text', `Item total: $${(cents / 100).toFixed(2)}`);
    cy.byTest('tax-label').should('have.text', `Tax: $${(tax / 100).toFixed(2)}`);
    cy.byTest('total-label').should('have.text', `Total: $${((cents + tax) / 100).toFixed(2)}`);
  },
  cancel() {
    cy.byTest('cancel').click();
  },
  finish() {
    cy.byTest('finish').click();
  },
  expectNotReached() {
    cy.location('pathname').should('not.eq', '/checkout-step-two.html');
    cy.byTest('finish').should('not.exist');
  },
};
