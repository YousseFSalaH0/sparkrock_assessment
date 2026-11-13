@full-regression
Feature: Focused checkout
  Business-focused UI coverage; see docs/test-cases.md for rationale and assumptions.

  @regression
  Scenario: TC-30 Single-product totals with direct setup
    Given checkout is prepared directly with basket "lowPriceProduct"
    When I enter customer information using "validCustomer"
    And I continue to order review
    Then the review contains basket "lowPriceProduct" with correct totals

  Scenario: TC-31 Multi-product totals and rounding
    Given checkout is prepared directly with basket "roundingBasket"
    When I enter customer information using "validCustomer"
    And I continue to order review
    Then the review contains basket "roundingBasket" with correct totals

  @regression
  Scenario: TC-32 Order completion clears prepared cart
    Given checkout is prepared directly with basket "singleProduct"
    When I enter customer information using "validCustomer"
    And I continue to order review
    And I finish the order
    Then the order is confirmed and the cart is cleared

  @regression
  Scenario: TC-33 Cancel preserves prepared multi-item cart
    Given checkout is prepared directly with basket "twoProducts"
    When I cancel customer information
    Then I return to the cart with basket "twoProducts"

  Scenario: TC-34 International customer and leading-zero postal code
    Given checkout is prepared directly with basket "singleProduct"
    When I enter customer information using "internationalCustomer"
    And I continue to order review
    Then the review contains basket "singleProduct" with correct totals
