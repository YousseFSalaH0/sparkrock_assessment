import { loginWithFixture } from './authentication';
import { login } from '../pages/login';
import { catalog } from '../pages/catalog';
import { cart } from '../pages/cart';
import { header } from '../components/header';
import { checkoutInformation } from '../pages/checkout-information';
import { getBasket } from '../data/test-data';

/** A Given precondition composes the same login action used by authentication tests. */
export function loginThroughUi(credentialsKey = 'validUser') {
  login.visit();
  loginWithFixture(credentialsKey);
  catalog.expectLoaded();
}
/** Complete UI setup: resolve a basket once and add its real products through UI. */
export function startCheckoutThroughUi(basketKey) {
  loginThroughUi();
  getBasket(basketKey).forEach((key) => catalog.add(key));
  header.openCart();
  cart.checkout();
  checkoutInformation.expectLoaded();
}
