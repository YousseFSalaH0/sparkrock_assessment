import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import { getNetworkCase, getProduct } from '../data/test-data';
import { catalog } from '../pages/catalog';
import { cart } from '../pages/cart';
import { header } from '../components/header';

// Register before navigation and wait for a real image request. A dataset selects
// the target asset and injected response; no fabricated commerce API is involved.
Given('the product image uses network case {string}', (key) => {
  const data = getNetworkCase(key);
  const pattern = getProduct(data.product).imageUrlPattern;
  if (!pattern) throw new Error(`No image request pattern for ${data.product}`);
  const response = { statusCode: data.statusCode, headers: { 'cache-control': 'no-store' } };
  if (data.fixture) {
    response.fixture = data.fixture;
    response.headers['content-type'] = data.contentType;
  } else response.body = data.body;
  cy.intercept({ method: 'GET', url: pattern }, response).as('productImage');
});
Then('network case {string} is observed and shopping still works', (key) => {
  const data = getNetworkCase(key);
  cy.wait('@productImage').its('response.statusCode').should('eq', data.statusCode);
  catalog
    .card(data.product)
    .find('img')
    .should(($img) => {
      expect($img[0].complete).to.equal(true);
      expect($img[0].naturalWidth).to.equal(data.naturalWidth);
      expect($img.attr('alt')).to.equal(getProduct(data.product).name);
    });
  catalog.add(data.product);
  header.openCart();
  cart.expectItems([data.product]);
  header.expectBadge(1);
});
