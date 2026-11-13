@full-regression
Feature: Checkout
  Business-focused UI coverage; see docs/test-cases.md for rationale and assumptions.

  @regression
  Scenario: TC-21 Valid information advances to correct review
    Given I reach checkout through the UI with basket "singleProduct"
    When I enter customer information using "validCustomer"
    And I continue to order review
    Then the review contains basket "singleProduct" with correct totals

  @regression
  Scenario Outline: TC-<id> Required checkout field <customer>
    Given I reach checkout through the UI with basket "singleProduct"
    When I enter customer information using "<customer>"
    And I continue to order review
    Then checkout is blocked for customer "<customer>"

    Examples:
      | id | customer          |
      | 22 | missingFirstName  |
      | 23 | missingLastName   |
      | 24 | missingPostalCode |

  Scenario: TC-25 All checkout fields empty
    Given I reach checkout through the UI with basket "singleProduct"
    When I enter customer information using "emptyCustomer"
    And I continue to order review
    Then checkout is blocked for customer "emptyCustomer"

  @regression @smoke
  Scenario: TC-26 Recover from validation without losing cart
    Given I reach checkout through the UI with basket "singleProduct"
    When I enter customer information using "missingPostalCode"
    And I continue to order review
    Then checkout is blocked for customer "missingPostalCode"
    When I enter customer information using "validCustomer"
    And I continue to order review
    Then the review contains basket "singleProduct" with correct totals

  @regression
  Scenario: TC-27 Cancel customer information returns to cart
    Given I reach checkout through the UI with basket "singleProduct"
    When I cancel customer information
    Then I return to the cart with basket "singleProduct"

  @regression
  Scenario: TC-28 Cancel review returns to products
    Given I reach checkout through the UI with basket "singleProduct"
    When I enter customer information using "validCustomer"
    And I continue to order review
    And I cancel order review
    Then I return to products with basket "singleProduct" retained

  @regression @smoke
  Scenario: TC-29 Complete two-product purchase through UI
    Given I reach checkout through the UI with basket "twoProducts"
    When I enter customer information using "validCustomer"
    And I continue to order review
    Then the review contains basket "twoProducts" with correct totals
    When I finish the order
    Then the order is confirmed and the cart is cleared
