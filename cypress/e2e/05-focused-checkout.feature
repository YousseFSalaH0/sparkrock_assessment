@regression
Feature: Focused checkout
  Business-focused UI coverage; see docs/test-cases.md for rationale and assumptions.

  @TC-30 @fast
  Scenario: TC-30 Single-product totals with direct setup
    Given checkout is prepared directly with "Sauce Labs Onesie"
    When I enter valid customer information
    And I continue to order review
    Then the review contains "Sauce Labs Onesie" with correct totals

  @TC-31 @fast
  Scenario: TC-31 Multi-product totals and rounding
    Given checkout is prepared directly with "Sauce Labs Onesie | Sauce Labs Bike Light | Sauce Labs Fleece Jacket"
    When I enter valid customer information
    And I continue to order review
    Then the review contains "Sauce Labs Onesie | Sauce Labs Bike Light | Sauce Labs Fleece Jacket" with correct totals

  @TC-32 @fast
  Scenario: TC-32 Order completion clears prepared cart
    Given checkout is prepared directly with "Sauce Labs Backpack"
    When I enter valid customer information
    And I continue to order review
    And I finish the order
    Then the order is confirmed and the cart is cleared

  @TC-33 @fast
  Scenario: TC-33 Cancel preserves prepared multi-item cart
    Given checkout is prepared directly with "Sauce Labs Backpack | Sauce Labs Bike Light"
    When I cancel checkout
    Then I return to the cart with "Sauce Labs Backpack | Sauce Labs Bike Light"

  @TC-34 @fast
  Scenario: TC-34 International customer and leading-zero postal code
    Given checkout is prepared directly with "Sauce Labs Backpack"
    When I enter customer information
      | firstName | Zoë |
      | lastName | O'Neil |
      | postalCode | 00123 |
    And I continue to order review
    Then the review contains "Sauce Labs Backpack" with correct totals

