import credentials from '../fixtures/credentials.json';
import products from '../fixtures/products.json';
import baskets from '../fixtures/baskets.json';
import customers from '../fixtures/customers.json';
import orders from '../fixtures/sort-orders.json';
import networkCases from '../fixtures/network-cases.json';

/** Resolve readable Gherkin keys without embedding application display text in tests.
 * Fail on misspellings; never silently substitute a default dataset. Copies prevent
 * a test from mutating shared reference data and influencing later scenarios. */
function named(collection, key, kind) {
  if (!Object.prototype.hasOwnProperty.call(collection, key)) {
    throw new Error(`Unknown ${kind} fixture: ${key}`);
  }
  return structuredClone(collection[key]);
}
export const productKeys = Object.keys(products);
export const getProduct = (key) => named(products, key, 'product');
export const getCustomer = (key) => named(customers, key, 'customer');
export const getSortOrder = (key) => named(orders, key, 'sort order');
export const getNetworkCase = (key) => named(networkCases, key, 'network case');

/** Basket datasets reference product keys rather than duplicating prices or names. */
export function getBasket(key) {
  const items = named(baskets, key, 'basket');
  items.forEach(getProduct);
  if (new Set(items).size !== items.length) throw new Error(`Duplicate product in basket: ${key}`);
  return items;
}

// Expected errors belong to the selected dataset, keeping input and oracle paired.
export function getExpectedError(kind, key) {
  const collection = kind === 'credentials' ? credentials : kind === 'customer' ? customers : null;
  if (!collection) throw new Error(`Unknown validation dataset kind: ${kind}`);
  const data = named(collection, key, kind);
  if (typeof data.expectedError !== 'string' || !data.expectedError.trim()) {
    throw new Error(`Missing expected error for ${kind}: ${key}`);
  }
  return data.expectedError;
}
