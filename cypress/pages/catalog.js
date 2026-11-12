import products from '../fixtures/products.json';

export function product(name) {
  const found = products.find((item) => item.name === name);
  if (!found) throw new Error(`Unknown fixture product: ${name}`);
  return found;
}
export const catalog = {
  card(name) {
    return cy
      .contains('[data-test="inventory-item-name"]', name)
      .closest('[data-test="inventory-item"]');
  },
  add(name) {
    this.card(name).contains('button', 'Add to cart').click();
  },
  remove(name) {
    this.card(name).contains('button', 'Remove').click();
  },
  open(name) {
    cy.contains('[data-test="inventory-item-name"]', name).click();
  },
  expectLoaded() {
    cy.location('pathname').should('eq', '/inventory.html');
    cy.byTest('title').should('have.text', 'Products');
  },
  expectCatalog() {
    cy.byTest('inventory-item').should('have.length', products.length);
    products.forEach(({ name, price }) => {
      this.card(name)
        .find('[data-test="inventory-item-price"]')
        .should('have.text', `$${price.toFixed(2)}`);
      this.card(name)
        .find('[data-test="inventory-item-desc"]')
        .invoke('text')
        .should('not.be.empty');
    });
  },
  expectSorted(order) {
    const values = {
      az: products.map((p) => p.name).sort(),
      za: products
        .map((p) => p.name)
        .sort()
        .reverse(),
      lohi: products.map((p) => p.price).sort((a, b) => a - b),
      hilo: products.map((p) => p.price).sort((a, b) => b - a),
    };
    const byPrice = order === 'lohi' || order === 'hilo';
    cy.byTest(byPrice ? 'inventory-item-price' : 'inventory-item-name').should(($nodes) => {
      const actual = [...$nodes].map((node) =>
        byPrice ? Number(node.textContent.replace('$', '')) : node.textContent,
      );
      expect(actual).to.deep.equal(values[order]);
    });
  },
};
