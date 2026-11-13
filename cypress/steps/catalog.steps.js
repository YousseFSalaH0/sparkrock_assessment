import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { catalog } from '../pages/catalog';
import { productDetails } from '../pages/product-details';

// Examples supply fixture keys. Product display names and prices have one source.
Then('all reference products have the expected names prices and descriptions', () =>
  catalog.expectCatalog(),
);
When('I sort products by {string}', (key) => catalog.sort(key));
Then('products are ordered by {string}', (key) => catalog.expectSorted(key));
When('I open the details for product {string}', (key) => catalog.open(key));
Then('the details match product {string} and I can return to the catalog', (key) => {
  productDetails.expectProduct(key);
  productDetails.backToProducts();
  catalog.expectLoaded();
});
