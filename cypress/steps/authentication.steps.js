import { getExpectedError } from '../data/test-data';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { loginWithFixture } from '../flows/authentication';
import { login } from '../pages/login';
import { header } from '../components/header';

// Authentication owns login outcomes; other features reuse the common signed-in Given.
Given('I am on the login page', () => login.visit());
When('I log in using {string} credentials', (key) => loginWithFixture(key));
Then('login is rejected for {string} credentials', (key) =>
  login.expectError(getExpectedError('credentials', key)),
);
When('I log out and revisit the inventory URL', () => {
  header.logout();
  cy.getCookie('session-username').should('be.null');
  // The static host serves its application fallback with 404 for deep links.
  // The assertion below still requires the real application's unauthenticated UI.
  cy.visit('/inventory.html', { failOnStatusCode: false });
});
Then('I must sign in again', () => login.expectUnauthenticated());
