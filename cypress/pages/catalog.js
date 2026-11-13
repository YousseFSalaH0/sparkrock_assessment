import { getProduct, getSortOrder, productKeys } from '../data/test-data';

/** Catalog screen owns catalog selectors. Callers supply fixture keys, never names. */
export const catalog = {
  card(key) {
    return cy
      .contains('[data-test="inventory-item-name"]', getProduct(key).name)
      .closest('[data-test="inventory-item"]');
  },
  add(key) {
    this.card(key).contains('button', 'Add to cart').click();
  },
  remove(key) {
    this.card(key).contains('button', 'Remove').click();
  },
  open(key) {
    cy.contains('[data-test="inventory-item-name"]', getProduct(key).name).click();
  },
  sort(orderKey) {
    cy.byTest('product-sort-container').select(getSortOrder(orderKey).option);
  },
  expectLoaded() {
    cy.location('pathname').should('eq', '/inventory.html');
    cy.byTest('title').should('have.text', 'Products');
  },
  expectCatalog() {
    cy.byTest('inventory-item').should('have.length', productKeys.length);
    productKeys.forEach((key) => {
      this.card(key)
        .find('[data-test="inventory-item-price"]')
        .should('have.text', `$${getProduct(key).price.toFixed(2)}`);
      this.card(key)
        .find('[data-test="inventory-item-desc"]')
        .invoke('text')
        .should('not.be.empty');
    });
  },
  expectSorted(orderKey) {
    const { field, descending } = getSortOrder(orderKey);
    // Compute the oracle from reference data, not from the UI values under test.
    const expected = productKeys.map((key) => getProduct(key)[field]);
    if (field === 'price') expected.sort((a, b) => a - b);
    else expected.sort();
    if (descending) expected.reverse();
    cy.byTest(field === 'price' ? 'inventory-item-price' : 'inventory-item-name').should(
      ($nodes) => {
        const actual = [...$nodes].map((node) =>
          field === 'price' ? Number(node.textContent.replace('$', '')) : node.textContent,
        );
        expect(actual).to.deep.equal(expected);
      },
    );
  },
};
