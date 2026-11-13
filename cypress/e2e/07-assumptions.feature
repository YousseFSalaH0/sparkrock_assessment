@full-regression
Feature: Assumptions
  Business-focused UI coverage; see docs/test-cases.md for rationale and assumptions.

  Scenario: TC-37 Reject whitespace-only first name
    Given I reach checkout through the UI with basket "singleProduct"
    When I enter customer information using "whitespaceFirstName"
    And I continue to order review
    Then whitespace-only first name is rejected under assumption A-03

  Scenario: TC-38 Prevent empty-cart order
    Given I am signed in through the UI
    When I attempt checkout with an empty cart
    Then an empty order is blocked under assumption A-04
