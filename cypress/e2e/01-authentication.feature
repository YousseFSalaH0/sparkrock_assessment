@regression
Feature: Authentication
  Business-focused UI coverage; see docs/test-cases.md for rationale and assumptions.

  @TC-01 @smoke
  Scenario: TC-01 Valid standard login
    Given I am on the login page
    When I log in with username "standard_user" and password "secret_sauce"
    Then the product catalog is displayed

  @data-driven
  Scenario Outline: TC-<id> Login validation - <label>
    Given I am on the login page
    When I log in with username "<username>" and password "<password>"
    Then login is rejected with "<error>"

    Examples:
      | id | label | username | password | error |
      | 02 | Incorrect password | standard_user | incorrect | Username and password do not match any user in this service |
      | 03 | Unknown username | unknown_person | secret_sauce | Username and password do not match any user in this service |
      | 04 | Missing username |  | secret_sauce | Username is required |
      | 05 | Missing password | standard_user |  | Password is required |
      | 06 | Both login fields empty |  |  | Username is required |
      | 07 | Locked-out account | locked_out_user | secret_sauce | Sorry, this user has been locked out. |

  @TC-08 
  Scenario: TC-08 Logout protects direct inventory navigation
    Given I am signed in through the UI
    When I log out and revisit the inventory URL
    Then I must sign in again

