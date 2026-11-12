import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { login } from '../pages/login';
import { catalog, product } from '../pages/catalog';
import { header, cart } from '../pages/components';
import { checkout } from '../pages/checkout';
import { loginThroughUi, startCheckoutThroughUi } from '../flows/shopping';
import products from '../fixtures/products.json';
import customer from '../fixtures/customer.json';

const namesFrom = (text) => text.split(' | ');

Given('I am on the login page', () => login.visit());
Given('I am signed in through the UI', () => loginThroughUi());
When('I log in with username {string} and password {string}', (username, password) =>
  login.submit(username, password),
);
Then('the product catalog is displayed', () => catalog.expectLoaded());
Then('login is rejected with {string}', (message) => login.expectError(message));
When('I log out and revisit the inventory URL', () => {
  header.logout();
  cy.getCookie('session-username').should('be.null');
  cy.visit('/inventory.html', { failOnStatusCode: false });
});
Then('I must sign in again', () => {
  cy.location('pathname').should('eq', '/');
  cy.byTest('login-button').should('be.visible');
  cy.byTest('inventory-list').should('not.exist');
});
Then('all six products have the expected names prices and descriptions', () =>
  catalog.expectCatalog(),
);
When('I sort products by {string}', (order) => cy.byTest('product-sort-container').select(order));
Then('products are ordered by {string}', (order) => catalog.expectSorted(order));
When('I open the details for {string}', (name) => catalog.open(name));
Then('the details match {string}', (name) => {
  cy.location('search').should('eq', `?id=${product(name).id}`);
  cy.byTest('inventory-item-name').should('have.text', name);
  cy.byTest('inventory-item-price').should('have.text', `$${product(name).price.toFixed(2)}`);
  cy.byTest('back-to-products').click();
  catalog.expectLoaded();
});
When('I add {string} to the cart', (name) => catalog.add(name));
When('I add all six products to the cart', () => products.forEach(({ name }) => catalog.add(name)));
When('I remove {string} from the catalog', (name) => catalog.remove(name));
When('I open the cart', () => header.openCart());
When('I remove {string} from the cart', (name) => cart.remove(name));
Then('the cart badge shows {int} items', (count) => header.expectBadge(count));
Then('the cart contains exactly {string}', (names) => cart.expectItems(namesFrom(names)));
Then('the cart contains all six products', () =>
  cart.expectItems(products.map(({ name }) => name)),
);
Then('the cart is empty', () => {
  cy.get('.cart_item').should('not.exist');
  header.expectBadge(0);
});
When('I reload the page', () => cy.reload());
When('I continue shopping', () => cy.byTest('continue-shopping').click());

Given('I reach checkout through the UI with {string}', (names) =>
  startCheckoutThroughUi(namesFrom(names)),
);
Given('checkout is prepared directly with {string}', (names) =>
  cy.seedCheckout(namesFrom(names).map((name) => product(name).id)),
);
When('I enter valid customer information', () => checkout.fill());
When('I enter customer information', (table) => {
  const details = table.rowsHash();
  // Gherkin trims table padding; this explicit token preserves a whitespace boundary.
  Object.keys(details).forEach((key) => {
    if (details[key] === '<spaces>') details[key] = '   ';
  });
  checkout.fill(details);
});
When('I leave {string} blank and complete the other customer fields', (field) =>
  checkout.fill({ ...customer, [field]: '' }),
);
When('I continue to order review', () => checkout.continue());
Then('checkout is blocked with {string}', (message) => checkout.expectError(message));
Then('the review contains {string} with correct totals', (names) =>
  checkout.expectReview(namesFrom(names)),
);
When('I cancel checkout', () => cy.byTest('cancel').click());
Then('I return to the cart with {string}', (names) => {
  cy.location('pathname').should('eq', '/cart.html');
  cart.expectItems(namesFrom(names));
});
Then('I return to products with {int} items retained', (count) => {
  catalog.expectLoaded();
  header.expectBadge(count);
});
When('I finish the order', () => checkout.finish());
Then('the order is confirmed and the cart is cleared', () => {
  checkout.expectComplete();
  header.expectBadge(0);
  cy.byTest('back-to-products').click();
  catalog.expectLoaded();
  header.openCart();
  cy.get('.cart_item').should('not.exist');
});

Given('the backpack image response is {string}', (mode) => {
  // Match a genuine asset request, not a fictional commerce API. This also
  // catches hashed production filenames without coupling to a release hash.
  const matcher = { method: 'GET', url: '**/*sauce-backpack*' };
  const response =
    mode === 'replaced'
      ? {
          statusCode: 200,
          fixture: 'replacement.svg',
          headers: { 'content-type': 'image/svg+xml', 'cache-control': 'no-store' },
        }
      : { statusCode: 404, body: '', headers: { 'cache-control': 'no-store' } };
  cy.intercept(matcher, response).as('backpackImage');
});
Then('the {string} image response is observed and shopping still works', (mode) => {
  cy.wait('@backpackImage')
    .its('response.statusCode')
    .should('eq', mode === 'replaced' ? 200 : 404);
  catalog
    .card('Sauce Labs Backpack')
    .find('img')
    .should(($img) => {
      expect($img[0].complete).to.equal(true);
      expect($img[0].naturalWidth).to.equal(mode === 'replaced' ? 64 : 0);
      expect($img.attr('alt')).to.equal('Sauce Labs Backpack');
    });
  catalog.add('Sauce Labs Backpack');
  header.openCart();
  cart.expectItems(['Sauce Labs Backpack']);
  header.expectBadge(1);
});

Then('whitespace-only first name is rejected under assumption A-03', () => {
  // A proposed acceptance criterion. A red result is evidence of a requirements
  // gap to discuss, not proof of a violation of supplied product requirements.
  cy.location('pathname').should('eq', '/checkout-step-one.html');
  cy.byTest('error').should('be.visible');
});
When('I attempt checkout with an empty cart', () => {
  header.openCart();
  cy.byTest('checkout').click();
  checkout.fill();
  checkout.continue();
});
Then('an empty order is blocked under assumption A-04', () => {
  cy.location('pathname').should('not.eq', '/checkout-step-two.html');
  cy.byTest('finish').should('not.exist');
});
