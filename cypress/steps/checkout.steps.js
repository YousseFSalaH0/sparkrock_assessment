import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { getBasket, getCustomer, getExpectedError } from '../data/test-data';
import { startCheckoutThroughUi } from '../flows/shopping';
import { checkoutInformation } from '../pages/checkout-information';
import { checkoutReview } from '../pages/checkout-review';
import { checkoutComplete } from '../pages/checkout-complete';
import { cart } from '../pages/cart';
import { catalog } from '../pages/catalog';
import { header } from '../components/header';

// Named datasets pair inputs with expected errors. These bindings delegate each
// screen's interactions to its page object instead of mixing selectors into steps.
Given('I reach checkout through the UI with basket {string}', (key) => startCheckoutThroughUi(key));
When('I enter customer information using {string}', (key) =>
  checkoutInformation.fill(getCustomer(key)),
);
When('I continue to order review', () => checkoutInformation.continue());
Then('checkout is blocked for customer {string}', (key) =>
  checkoutInformation.expectError(getExpectedError('customer', key)),
);
Then('the review contains basket {string} with correct totals', (key) =>
  checkoutReview.expectOrder(getBasket(key)),
);
When('I cancel customer information', () => checkoutInformation.cancel());
When('I cancel order review', () => checkoutReview.cancel());
Then('I return to the cart with basket {string}', (key) => {
  cart.expectLoaded();
  cart.expectItems(getBasket(key));
});
Then('I return to products with basket {string} retained', (key) => {
  catalog.expectLoaded();
  header.expectBadge(getBasket(key).length);
});
When('I finish the order', () => checkoutReview.finish());
Then('the order is confirmed and the cart is cleared', () => {
  checkoutComplete.expectConfirmed();
  header.expectBadge(0);
  checkoutComplete.backToProducts();
  catalog.expectLoaded();
  header.openCart();
  cart.expectEmpty();
});
