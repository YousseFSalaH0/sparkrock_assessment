@full-regression
Feature: Catalog
  Business-focused UI coverage; see docs/test-cases.md for rationale and assumptions.

  @regression
  Scenario: TC-09 Catalog completeness and price integrity
    Given I am signed in through the UI
    Then all reference products have the expected names prices and descriptions

  @regression
  Scenario Outline: TC-<id> Product sorting <order>
    Given I am signed in through the UI
    When I sort products by "<order>"
    Then products are ordered by "<order>"

    Examples:
      | id | order           |
      | 10 | nameAscending   |
      | 11 | nameDescending  |
      | 12 | priceAscending  |
      | 13 | priceDescending |

  @regression
  Scenario Outline: TC-<id> Product details and return navigation - <product>
    Given I am signed in through the UI
    When I open the details for product "<product>"
    Then the details match product "<product>" and I can return to the catalog

    Examples:
      | id | product   |
      | 14 | backpack  |
      | 42 | bikeLight |
      | 43 | onesie    |
