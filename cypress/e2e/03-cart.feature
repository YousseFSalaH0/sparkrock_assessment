@full-regression
Feature: Cart
  Business-focused UI coverage; see docs/test-cases.md for rationale and assumptions.

  @regression @smoke
  Scenario: TC-15 Add one product and update badge
    Given I am signed in through the UI
    When I add basket "singleProduct" to the cart
    Then the cart badge matches basket "singleProduct"
    When I open the cart
    Then the cart contains basket "singleProduct"

  Scenario: TC-16 Remove from catalog resets badge
    Given I am signed in through the UI
    When I add basket "singleProduct" to the cart
    And I remove basket "singleProduct" from the catalog
    Then the cart badge is absent
    When I open the cart
    Then the cart is empty

  Scenario: TC-17 Remove final product from cart
    Given I am signed in through the UI
    When I add basket "singleProduct" to the cart
    And I open the cart
    And I remove basket "singleProduct" from the cart
    Then the cart is empty

  @regression
  Scenario: TC-18 Cart survives page reload
    Given I am signed in through the UI
    When I add basket "singleProduct" to the cart
    And I open the cart
    And I reload the page
    Then the cart contains basket "singleProduct"
    And the cart badge matches basket "singleProduct"

  @regression
  Scenario: TC-19 Continue shopping preserves selection
    Given I am signed in through the UI
    When I add basket "singleProduct" to the cart
    And I open the cart
    And I continue shopping
    Then the product catalog is displayed
    And the cart badge matches basket "singleProduct"

  Scenario: TC-20 All available products retained once
    Given I am signed in through the UI
    When I add basket "allProducts" to the cart
    Then the cart badge matches basket "allProducts"
    When I open the cart
    Then the cart contains basket "allProducts"
