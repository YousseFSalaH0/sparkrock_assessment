import credentials from '../fixtures/credentials.json';

Cypress.Commands.add('byTest', (id) => cy.get(`[data-test="${id}"]`));

/**
 * White-box setup for exactly five focused-checkout scenarios. Sauce Demo has no login or
 * cart API: seed its documented browser state before React mounts. This bypasses
 * setup only; every action and assertion under test still uses the real UI.
 */
Cypress.Commands.add('seedCheckout', (productIds) => {
  // The public static host returns HTTP 404 on a direct checkout URL. Load its
  // real entry document, then set the client route before React initializes.
  // Unlike failOnStatusCode:false this still fails on a genuine entry-page error.
  cy.visit('/', {
    onBeforeLoad(win) {
      win.document.cookie = `session-username=${credentials.validUser.username}; path=/`;
      win.localStorage.setItem('cart-contents', JSON.stringify(productIds));
      win.history.replaceState(null, '', '/checkout-step-one.html');
    },
  });
  cy.location('pathname').should('eq', '/checkout-step-one.html');
  cy.getCookie('session-username').its('value').should('eq', credentials.validUser.username);
});
