import customer from '../fixtures/customer.json';
import { product } from './catalog';

export const checkout = {
  fill(details = customer) {
    Object.entries(details).forEach(([field, value]) => {
      cy.byTest(field).clear();
      if (value) cy.byTest(field).type(value, { parseSpecialCharSequences: false });
    });
  },
  continue() {
    cy.byTest('continue').click();
  },
  expectError(message) {
    cy.location('pathname').should('eq', '/checkout-step-one.html');
    cy.byTest('error').should('be.visible').and('have.text', `Error: ${message}`);
  },
  expectReview(names) {
    cy.location('pathname').should('eq', '/checkout-step-two.html');
    cy.get('.cart_item').should('have.length', names.length);
    names.forEach((name) => {
      cy.contains('.cart_item', name)
        .find('.inventory_item_price')
        .should('have.text', `$${product(name).price.toFixed(2)}`);
    });
    // Independent oracle uses the approved fixture, not the displayed UI total.
    // Integer cents avoid binary floating-point surprises. A-02 defines 8% tax.
    const cents = names.reduce((sum, name) => sum + Math.round(product(name).price * 100), 0);
    const tax = Math.round(cents * 0.08);
    cy.byTest('subtotal-label').should('have.text', `Item total: $${(cents / 100).toFixed(2)}`);
    cy.byTest('tax-label').should('have.text', `Tax: $${(tax / 100).toFixed(2)}`);
    cy.byTest('total-label').should('have.text', `Total: $${((cents + tax) / 100).toFixed(2)}`);
  },
  finish() {
    cy.byTest('finish').click();
  },
  expectComplete() {
    cy.location('pathname').should('eq', '/checkout-complete.html');
    cy.byTest('complete-header').should('have.text', 'Thank you for your order!');
    cy.byTest('back-to-products').should('be.visible');
  },
};
