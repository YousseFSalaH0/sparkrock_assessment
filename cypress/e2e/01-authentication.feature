@full-regression
Feature: Authentication
  Named fixture objects pair credential inputs with expected validation errors.

  @regression @smoke
  Scenario: TC-01 Valid standard login
    Given I am on the login page
    When I log in using "validUser" credentials
    Then the product catalog is displayed

  Scenario Outline: TC-<id> Login validation - <label>
    Given I am on the login page
    When I log in using "<credentials>" credentials
    Then login is rejected for "<credentials>" credentials

    @regression
    Examples: Common invalid credentials
      | id | label              | credentials   |
      | 02 | Incorrect password | wrongPassword |
      | 03 | Unknown username   | wrongUsername |
      | 04 | Missing username   | emptyUsername |
      | 05 | Missing password   | emptyPassword |
      | 07 | Locked-out account | lockedUser    |

    Examples: Combined invalid inputs
      | id | label                      | credentials |
      | 06 | Both login fields empty    | bothEmpty   |
      | 41 | Both credentials incorrect | bothWrong   |

  @regression
  Scenario: TC-08 Logout protects direct inventory navigation
    Given I am signed in through the UI
    When I log out and revisit the inventory URL
    Then I must sign in again
