import { login } from '../pages/login';
import { catalog } from '../pages/catalog';
import { header } from '../pages/components';

// Flows compose page actions without obscuring the business assertions in steps.
export function loginThroughUi() {
  login.visit();
  login.submit();
  catalog.expectLoaded();
}
export function startCheckoutThroughUi(names) {
  loginThroughUi();
  names.forEach((name) => catalog.add(name));
  header.openCart();
  cy.byTest('checkout').click();
  cy.location('pathname').should('eq', '/checkout-step-one.html');
}
