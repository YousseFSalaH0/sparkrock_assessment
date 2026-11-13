@full-regression
Feature: Network
  Real image requests are stubbed using named response datasets.

  Scenario Outline: TC-<id> Product image resilience - <networkCase>
    Given the product image uses network case "<networkCase>"
    And I am signed in through the UI
    Then network case "<networkCase>" is observed and shopping still works

    Examples:
      | id | networkCase      |
      | 35 | replacementImage |
      | 36 | missingImage     |
