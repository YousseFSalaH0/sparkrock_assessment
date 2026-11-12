@regression
Feature: Network
  Business-focused UI coverage; see docs/test-cases.md for rationale and assumptions.

  @TC-35 @network
  Scenario: TC-35 Product image replaced without blocking shopping
    Given the backpack image response is "replaced"
    And I am signed in through the UI
    Then the "replaced" image response is observed and shopping still works

  @TC-36 @network
  Scenario: TC-36 Product image unavailable without blocking shopping
    Given the backpack image response is "unavailable"
    And I am signed in through the UI
    Then the "unavailable" image response is observed and shopping still works

