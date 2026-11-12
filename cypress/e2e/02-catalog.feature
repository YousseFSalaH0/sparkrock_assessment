@regression
Feature: Catalog
  Business-focused UI coverage; see docs/test-cases.md for rationale and assumptions.

  @TC-09 
  Scenario: TC-09 Catalog completeness and price integrity
    Given I am signed in through the UI
    Then all six products have the expected names prices and descriptions

  @data-driven
  Scenario Outline: TC-<id> Product sorting <order>
    Given I am signed in through the UI
    When I sort products by "<order>"
    Then products are ordered by "<order>"

    Examples:
      | id | order |
      | 10 | az |
      | 11 | za |
      | 12 | lohi |
      | 13 | hilo |

  @TC-14 
  Scenario: TC-14 Product details and return navigation
    Given I am signed in through the UI
    When I open the details for "Sauce Labs Backpack"
    Then the details match "Sauce Labs Backpack"

