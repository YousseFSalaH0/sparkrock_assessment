import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { getBasket } from '../data/test-data';
import { catalog } from '../pages/catalog';
import { cart } from '../pages/cart';
import { header } from '../components/header';

// A basket is input data; expected counts follow that data rather than magic numbers.
When('I add basket {string} to the cart', (key) =>
  getBasket(key).forEach((item) => catalog.add(item)),
);
When('I remove basket {string} from the catalog', (key) =>
  getBasket(key).forEach((item) => catalog.remove(item)),
);
When('I open the cart', () => header.openCart());
When('I remove basket {string} from the cart', (key) =>
  getBasket(key).forEach((item) => cart.remove(item)),
);
Then('the cart badge matches basket {string}', (key) => header.expectBadge(getBasket(key).length));
Then('the cart badge is absent', () => header.expectBadge(0));
Then('the cart contains basket {string}', (key) => cart.expectItems(getBasket(key)));
Then('the cart is empty', () => {
  cart.expectEmpty();
  header.expectBadge(0);
});
When('I continue shopping', () => cart.continueShopping());
