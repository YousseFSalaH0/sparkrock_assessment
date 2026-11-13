import { login } from '../pages/login';

/** Resolve a named public-demo data set. A typo must fail clearly rather than
 * silently becoming an empty-field test. Empty strings remain valid test data. */
export function loginWithFixture(name) {
  return cy.fixture('credentials').then((datasets) => {
    if (!Object.prototype.hasOwnProperty.call(datasets, name)) {
      throw new Error('Unknown credentials fixture: ' + name);
    }
    const credentials = datasets[name];
    if (typeof credentials.username !== 'string' || typeof credentials.password !== 'string') {
      throw new Error('Credentials must contain string username and password: ' + name);
    }
    return login.submit(credentials);
  });
}
