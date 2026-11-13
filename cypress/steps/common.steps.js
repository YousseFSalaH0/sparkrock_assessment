import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { loginThroughUi } from '../flows/shopping';
import { catalog } from '../pages/catalog';

// Register cross-feature steps once. Cucumber loads the directory globally, so
// copying these expressions into each feature file would create ambiguous steps.
Given('I am signed in through the UI', () => loginThroughUi());
Then('the product catalog is displayed', () => catalog.expectLoaded());
When('I reload the page', () => cy.reload());
