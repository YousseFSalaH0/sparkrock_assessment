import { Given } from '@badeball/cypress-cucumber-preprocessor';
import { getBasket, getProduct } from '../data/test-data';

// Only the five focused-checkout cases use this white-box setup. Shared checkout When/Then steps still
// exercise the real UI; there is no second set of checkout step definitions.
Given('checkout is prepared directly with basket {string}', (key) => {
  cy.seedCheckout(getBasket(key).map((item) => getProduct(item).id));
});
