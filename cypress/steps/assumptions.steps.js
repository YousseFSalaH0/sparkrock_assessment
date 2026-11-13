import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { getCustomer } from '../data/test-data';
import { checkoutInformation } from '../pages/checkout-information';
import { checkoutReview } from '../pages/checkout-review';
import { cart } from '../pages/cart';
import { header } from '../components/header';

// These proposed criteria intentionally remain separate from the regression
// baseline. A failure documents a requirement gap, not a confirmed product defect.
Then('whitespace-only first name is rejected under assumption A-03', () =>
  checkoutInformation.expectAnyError(),
);
When('I attempt checkout with an empty cart', () => {
  header.openCart();
  cart.checkout();
  checkoutInformation.fill(getCustomer('validCustomer'));
  checkoutInformation.continue();
});
Then('an empty order is blocked under assumption A-04', () => checkoutReview.expectNotReached());
