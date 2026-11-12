@regression
Feature: Cart
  Business-focused UI coverage; see docs/test-cases.md for rationale and assumptions.

  @TC-15 @smoke
  Scenario: TC-15 Add one product and update badge
    Given I am signed in through the UI
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge shows 1 items
    When I open the cart
    Then the cart contains exactly "Sauce Labs Backpack"

  @TC-16 
  Scenario: TC-16 Remove from catalog resets badge
    Given I am signed in through the UI
    When I add "Sauce Labs Backpack" to the cart
    And I remove "Sauce Labs Backpack" from the catalog
    Then the cart badge shows 0 items
    When I open the cart
    Then the cart is empty

  @TC-17 
  Scenario: TC-17 Remove final product from cart
    Given I am signed in through the UI
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    And I remove "Sauce Labs Backpack" from the cart
    Then the cart is empty

  @TC-18 
  Scenario: TC-18 Cart survives page reload
    Given I am signed in through the UI
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    And I reload the page
    Then the cart contains exactly "Sauce Labs Backpack"
    And the cart badge shows 1 items

  @TC-19 
  Scenario: TC-19 Continue shopping preserves selection
    Given I am signed in through the UI
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    And I continue shopping
    Then the product catalog is displayed
    And the cart badge shows 1 items

  @TC-20 
  Scenario: TC-20 All available products retained once
    Given I am signed in through the UI
    When I add all six products to the cart
    Then the cart badge shows 6 items
    When I open the cart
    Then the cart contains all six products

