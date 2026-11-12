@regression
Feature: Checkout
  Business-focused UI coverage; see docs/test-cases.md for rationale and assumptions.

  @TC-21 
  Scenario: TC-21 Valid information advances to correct review
    Given I reach checkout through the UI with "Sauce Labs Backpack"
    When I enter valid customer information
    And I continue to order review
    Then the review contains "Sauce Labs Backpack" with correct totals

  @data-driven
  Scenario Outline: TC-<id> Required checkout field <field>
    Given I reach checkout through the UI with "Sauce Labs Backpack"
    When I leave "<field>" blank and complete the other customer fields
    And I continue to order review
    Then checkout is blocked with "<error>"

    Examples:
      | id | field | error |
      | 22 | firstName | First Name is required |
      | 23 | lastName | Last Name is required |
      | 24 | postalCode | Postal Code is required |

  @TC-25 
  Scenario: TC-25 All checkout fields empty
    Given I reach checkout through the UI with "Sauce Labs Backpack"
    When I continue to order review
    Then checkout is blocked with "First Name is required"

  @TC-26 @recording @smoke
  Scenario: TC-26 Recover from validation without losing cart
    Given I reach checkout through the UI with "Sauce Labs Backpack"
    When I leave "postalCode" blank and complete the other customer fields
    And I continue to order review
    Then checkout is blocked with "Postal Code is required"
    When I enter valid customer information
    And I continue to order review
    Then the review contains "Sauce Labs Backpack" with correct totals

  @TC-27 
  Scenario: TC-27 Cancel customer information returns to cart
    Given I reach checkout through the UI with "Sauce Labs Backpack"
    When I cancel checkout
    Then I return to the cart with "Sauce Labs Backpack"

  @TC-28 
  Scenario: TC-28 Cancel review returns to products
    Given I reach checkout through the UI with "Sauce Labs Backpack"
    When I enter valid customer information
    And I continue to order review
    And I cancel checkout
    Then I return to products with 1 items retained

  @TC-29 @recording @smoke
  Scenario: TC-29 Complete two-product purchase through UI
    Given I reach checkout through the UI with "Sauce Labs Backpack | Sauce Labs Bike Light"
    When I enter valid customer information
    And I continue to order review
    Then the review contains "Sauce Labs Backpack | Sauce Labs Bike Light" with correct totals
    When I finish the order
    Then the order is confirmed and the cart is cleared

