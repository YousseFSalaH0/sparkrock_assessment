@regression
Feature: Assumptions
  Business-focused UI coverage; see docs/test-cases.md for rationale and assumptions.

  @TC-37 @assumption
  Scenario: TC-37 Reject whitespace-only first name
    Given I reach checkout through the UI with "Sauce Labs Backpack"
    When I enter customer information
      | firstName | <spaces> |
      | lastName | Tester |
      | postalCode | 02108 |
    And I continue to order review
    Then whitespace-only first name is rejected under assumption A-03

  @TC-38 @assumption
  Scenario: TC-38 Prevent empty-cart order
    Given I am signed in through the UI
    When I attempt checkout with an empty cart
    Then an empty order is blocked under assumption A-04

