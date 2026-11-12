# Test case specification

Prepared before the candidate recording. Target: Sauce Demo public shopping application.
40 cases: 36 baseline automated, 2 assumption-based automated, 2 manual (not executed).
Automated cases use a fresh browser context per scenario. Data is synthetic and demo credentials are public.
Priorities: P0 purchase/access critical; P1 significant functional risk; P2 supporting behavior/usability.
For each case, Given defines prerequisites; When/And define actions; Then defines expected results.
The Gherkin below is executable for TC-01–TC-38. Assertions are NOT execution results: see reports and execution-results.md.
Requirements are reconstructed for the exercise; no product-owner-approved specification was supplied.
See assumptions.md for A-01–A-06 and investigation status.

## Traceability matrix

| ID    | Area             | Title                                               | Type                | Priority | Execution mode                   |
| ----- | ---------------- | --------------------------------------------------- | ------------------- | -------- | -------------------------------- |
| TC-01 | Authentication   | Valid standard login                                | Positive            | P0       | Automated / UI setup             |
| TC-02 | Authentication   | Incorrect password                                  | Negative            | P1       | Automated / UI setup             |
| TC-03 | Authentication   | Unknown username                                    | Negative            | P1       | Automated / UI setup             |
| TC-04 | Authentication   | Missing username                                    | Negative            | P1       | Automated / UI setup             |
| TC-05 | Authentication   | Missing password                                    | Negative            | P1       | Automated / UI setup             |
| TC-06 | Authentication   | Both login fields empty                             | Negative            | P1       | Automated / UI setup             |
| TC-07 | Authentication   | Locked-out account                                  | Negative            | P1       | Automated / UI setup             |
| TC-08 | Authentication   | Logout protects direct inventory navigation         | Negative            | P0       | Automated / UI setup             |
| TC-09 | Catalog          | Catalog completeness and price integrity            | Positive            | P1       | Automated / UI setup             |
| TC-10 | Catalog          | Product sorting az                                  | Positive            | P2       | Automated / UI setup             |
| TC-11 | Catalog          | Product sorting za                                  | Positive            | P2       | Automated / UI setup             |
| TC-12 | Catalog          | Product sorting lohi                                | Positive            | P2       | Automated / UI setup             |
| TC-13 | Catalog          | Product sorting hilo                                | Positive            | P2       | Automated / UI setup             |
| TC-14 | Catalog          | Product details and return navigation               | Positive            | P1       | Automated / UI setup             |
| TC-15 | Cart             | Add one product and update badge                    | Positive            | P0       | Automated / UI setup             |
| TC-16 | Cart             | Remove from catalog resets badge                    | Boundary            | P1       | Automated / UI setup             |
| TC-17 | Cart             | Remove final product from cart                      | Boundary            | P1       | Automated / UI setup             |
| TC-18 | Cart             | Cart survives page reload                           | Positive            | P1       | Automated / UI setup             |
| TC-19 | Cart             | Continue shopping preserves selection               | Positive            | P2       | Automated / UI setup             |
| TC-20 | Cart             | All available products retained once                | Boundary            | P1       | Automated / UI setup             |
| TC-21 | Checkout         | Valid information advances to correct review        | Positive            | P0       | Automated / UI setup             |
| TC-22 | Checkout         | Required firstName validation                       | Negative            | P1       | Automated / UI setup             |
| TC-23 | Checkout         | Required lastName validation                        | Negative            | P1       | Automated / UI setup             |
| TC-24 | Checkout         | Required postalCode validation                      | Negative            | P1       | Automated / UI setup             |
| TC-25 | Checkout         | All checkout fields empty                           | Negative            | P1       | Automated / UI setup             |
| TC-26 | Checkout         | Recover from validation without losing cart         | Negative/recovery   | P0       | Automated / UI setup             |
| TC-27 | Checkout         | Cancel customer information returns to cart         | Positive            | P1       | Automated / UI setup             |
| TC-28 | Checkout         | Cancel review returns to products                   | Positive            | P1       | Automated / UI setup             |
| TC-29 | Checkout         | Complete two-product purchase through UI            | Positive/E2E        | P0       | Automated / UI setup             |
| TC-30 | Focused checkout | Single-product totals with direct setup             | Positive            | P1       | Automated / direct setup         |
| TC-31 | Focused checkout | Multi-product totals and rounding                   | Boundary            | P0       | Automated / direct setup         |
| TC-32 | Focused checkout | Order completion clears prepared cart               | Positive            | P0       | Automated / direct setup         |
| TC-33 | Focused checkout | Cancel preserves prepared multi-item cart           | Positive            | P1       | Automated / direct setup         |
| TC-34 | Focused checkout | International customer and leading-zero postal code | Boundary            | P2       | Automated / direct setup         |
| TC-35 | Network          | Product image replaced without blocking shopping    | Positive            | P2       | Automated / UI setup             |
| TC-36 | Network          | Product image unavailable without blocking shopping | Negative/resilience | P2       | Automated / UI setup             |
| TC-37 | Assumptions      | Reject whitespace-only first name                   | Negative/assumption | P1       | Automated / proposed requirement |
| TC-38 | Assumptions      | Prevent empty-cart order                            | Negative/assumption | P1       | Automated / proposed requirement |
| TC-39 | Manual           | Keyboard and screen-reader checkout journey         | Accessibility       | P1       | Manual / not executed            |
| TC-40 | Manual           | Responsive layout and zoom readability              | Usability/boundary  | P2       | Manual / not executed            |

## TC-01 — Valid standard login

- **Mode:** Automated / UI setup
- **Priority/type:** P0 / Positive
- **Requirement basis:** A-01; see assumptions.md.
- **Rationale:** Protect access and distinguish invalid, missing and locked credentials. P0 access checks precede less critical presentation checks.
- **Implementation:** `cypress/e2e/01-authentication.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I am on the login page
When I log in with username "standard_user" and password "secret_sauce"
Then the product catalog is displayed
```

## TC-02 — Incorrect password

- **Mode:** Automated / UI setup
- **Priority/type:** P1 / Negative
- **Requirement basis:** A-01; see assumptions.md.
- **Rationale:** Protect access and distinguish invalid, missing and locked credentials. P0 access checks precede less critical presentation checks.
- **Implementation:** `cypress/e2e/01-authentication.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I am on the login page
When I log in with username "standard_user" and password "incorrect"
Then login is rejected with "Username and password do not match any user in this service"
```

## TC-03 — Unknown username

- **Mode:** Automated / UI setup
- **Priority/type:** P1 / Negative
- **Requirement basis:** A-01; see assumptions.md.
- **Rationale:** Protect access and distinguish invalid, missing and locked credentials. P0 access checks precede less critical presentation checks.
- **Implementation:** `cypress/e2e/01-authentication.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I am on the login page
When I log in with username "unknown_person" and password "secret_sauce"
Then login is rejected with "Username and password do not match any user in this service"
```

## TC-04 — Missing username

- **Mode:** Automated / UI setup
- **Priority/type:** P1 / Negative
- **Requirement basis:** A-01; see assumptions.md.
- **Rationale:** Protect access and distinguish invalid, missing and locked credentials. P0 access checks precede less critical presentation checks.
- **Implementation:** `cypress/e2e/01-authentication.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I am on the login page
When I log in with username "" and password "secret_sauce"
Then login is rejected with "Username is required"
```

## TC-05 — Missing password

- **Mode:** Automated / UI setup
- **Priority/type:** P1 / Negative
- **Requirement basis:** A-01; see assumptions.md.
- **Rationale:** Protect access and distinguish invalid, missing and locked credentials. P0 access checks precede less critical presentation checks.
- **Implementation:** `cypress/e2e/01-authentication.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I am on the login page
When I log in with username "standard_user" and password ""
Then login is rejected with "Password is required"
```

## TC-06 — Both login fields empty

- **Mode:** Automated / UI setup
- **Priority/type:** P1 / Negative
- **Requirement basis:** A-01; see assumptions.md.
- **Rationale:** Protect access and distinguish invalid, missing and locked credentials. P0 access checks precede less critical presentation checks.
- **Implementation:** `cypress/e2e/01-authentication.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I am on the login page
When I log in with username "" and password ""
Then login is rejected with "Username is required"
```

## TC-07 — Locked-out account

- **Mode:** Automated / UI setup
- **Priority/type:** P1 / Negative
- **Requirement basis:** A-01; see assumptions.md.
- **Rationale:** Protect access and distinguish invalid, missing and locked credentials. P0 access checks precede less critical presentation checks.
- **Implementation:** `cypress/e2e/01-authentication.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I am on the login page
When I log in with username "locked_out_user" and password "secret_sauce"
Then login is rejected with "Sorry, this user has been locked out."
```

## TC-08 — Logout protects direct inventory navigation

- **Mode:** Automated / UI setup
- **Priority/type:** P0 / Negative
- **Requirement basis:** A-01; see assumptions.md.
- **Rationale:** Protect access and distinguish invalid, missing and locked credentials. P0 access checks precede less critical presentation checks.
- **Implementation:** `cypress/e2e/01-authentication.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I am signed in through the UI
When I log out and revisit the inventory URL
Then I must sign in again
```

## TC-09 — Catalog completeness and price integrity

- **Mode:** Automated / UI setup
- **Priority/type:** P1 / Positive
- **Requirement basis:** A-01; see assumptions.md.
- **Rationale:** Customers must find the intended product and see accurate prices. Exact fixture values and complete ordered arrays prevent weak count-only assertions.
- **Implementation:** `cypress/e2e/02-catalog.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I am signed in through the UI
Then all six products have the expected names prices and descriptions
```

## TC-10 — Product sorting az

- **Mode:** Automated / UI setup
- **Priority/type:** P2 / Positive
- **Requirement basis:** A-01; see assumptions.md.
- **Rationale:** Customers must find the intended product and see accurate prices. Exact fixture values and complete ordered arrays prevent weak count-only assertions.
- **Implementation:** `cypress/e2e/02-catalog.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I am signed in through the UI
When I sort products by "az"
Then products are ordered by "az"
```

## TC-11 — Product sorting za

- **Mode:** Automated / UI setup
- **Priority/type:** P2 / Positive
- **Requirement basis:** A-01; see assumptions.md.
- **Rationale:** Customers must find the intended product and see accurate prices. Exact fixture values and complete ordered arrays prevent weak count-only assertions.
- **Implementation:** `cypress/e2e/02-catalog.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I am signed in through the UI
When I sort products by "za"
Then products are ordered by "za"
```

## TC-12 — Product sorting lohi

- **Mode:** Automated / UI setup
- **Priority/type:** P2 / Positive
- **Requirement basis:** A-01; see assumptions.md.
- **Rationale:** Customers must find the intended product and see accurate prices. Exact fixture values and complete ordered arrays prevent weak count-only assertions.
- **Implementation:** `cypress/e2e/02-catalog.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I am signed in through the UI
When I sort products by "lohi"
Then products are ordered by "lohi"
```

## TC-13 — Product sorting hilo

- **Mode:** Automated / UI setup
- **Priority/type:** P2 / Positive
- **Requirement basis:** A-01; see assumptions.md.
- **Rationale:** Customers must find the intended product and see accurate prices. Exact fixture values and complete ordered arrays prevent weak count-only assertions.
- **Implementation:** `cypress/e2e/02-catalog.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I am signed in through the UI
When I sort products by "hilo"
Then products are ordered by "hilo"
```

## TC-14 — Product details and return navigation

- **Mode:** Automated / UI setup
- **Priority/type:** P1 / Positive
- **Requirement basis:** A-01; see assumptions.md.
- **Rationale:** Customers must find the intended product and see accurate prices. Exact fixture values and complete ordered arrays prevent weak count-only assertions.
- **Implementation:** `cypress/e2e/02-catalog.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I am signed in through the UI
When I open the details for "Sauce Labs Backpack"
Then the details match "Sauce Labs Backpack"
```

## TC-15 — Add one product and update badge

- **Mode:** Automated / UI setup
- **Priority/type:** P0 / Positive
- **Requirement basis:** A-01; see assumptions.md.
- **Rationale:** Lost or incorrect selections directly affect order accuracy. Exercise zero, one and the full available catalog, including refresh and return navigation.
- **Implementation:** `cypress/e2e/03-cart.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I am signed in through the UI
When I add "Sauce Labs Backpack" to the cart
Then the cart badge shows 1 items
When I open the cart
Then the cart contains exactly "Sauce Labs Backpack"
```

## TC-16 — Remove from catalog resets badge

- **Mode:** Automated / UI setup
- **Priority/type:** P1 / Boundary
- **Requirement basis:** A-01; see assumptions.md.
- **Rationale:** Lost or incorrect selections directly affect order accuracy. Exercise zero, one and the full available catalog, including refresh and return navigation.
- **Implementation:** `cypress/e2e/03-cart.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I am signed in through the UI
When I add "Sauce Labs Backpack" to the cart
And I remove "Sauce Labs Backpack" from the catalog
Then the cart badge shows 0 items
When I open the cart
Then the cart is empty
```

## TC-17 — Remove final product from cart

- **Mode:** Automated / UI setup
- **Priority/type:** P1 / Boundary
- **Requirement basis:** A-01; see assumptions.md.
- **Rationale:** Lost or incorrect selections directly affect order accuracy. Exercise zero, one and the full available catalog, including refresh and return navigation.
- **Implementation:** `cypress/e2e/03-cart.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I am signed in through the UI
When I add "Sauce Labs Backpack" to the cart
And I open the cart
And I remove "Sauce Labs Backpack" from the cart
Then the cart is empty
```

## TC-18 — Cart survives page reload

- **Mode:** Automated / UI setup
- **Priority/type:** P1 / Positive
- **Requirement basis:** A-01; see assumptions.md.
- **Rationale:** Lost or incorrect selections directly affect order accuracy. Exercise zero, one and the full available catalog, including refresh and return navigation.
- **Implementation:** `cypress/e2e/03-cart.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I am signed in through the UI
When I add "Sauce Labs Backpack" to the cart
And I open the cart
And I reload the page
Then the cart contains exactly "Sauce Labs Backpack"
And the cart badge shows 1 items
```

## TC-19 — Continue shopping preserves selection

- **Mode:** Automated / UI setup
- **Priority/type:** P2 / Positive
- **Requirement basis:** A-01; see assumptions.md.
- **Rationale:** Lost or incorrect selections directly affect order accuracy. Exercise zero, one and the full available catalog, including refresh and return navigation.
- **Implementation:** `cypress/e2e/03-cart.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I am signed in through the UI
When I add "Sauce Labs Backpack" to the cart
And I open the cart
And I continue shopping
Then the product catalog is displayed
And the cart badge shows 1 items
```

## TC-20 — All available products retained once

- **Mode:** Automated / UI setup
- **Priority/type:** P1 / Boundary
- **Requirement basis:** A-01; see assumptions.md.
- **Rationale:** Lost or incorrect selections directly affect order accuracy. Exercise zero, one and the full available catalog, including refresh and return navigation.
- **Implementation:** `cypress/e2e/03-cart.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I am signed in through the UI
When I add all six products to the cart
Then the cart badge shows 6 items
When I open the cart
Then the cart contains all six products
```

## TC-21 — Valid information advances to correct review

- **Mode:** Automated / UI setup
- **Priority/type:** P0 / Positive
- **Requirement basis:** A-01, A-02, A-05; see assumptions.md.
- **Rationale:** Prioritize the purchase journey, required-field rejection, recovery and cancel paths. Check the destination and business state, not only a button click.
- **Implementation:** `cypress/e2e/04-checkout.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I reach checkout through the UI with "Sauce Labs Backpack"
When I enter valid customer information
And I continue to order review
Then the review contains "Sauce Labs Backpack" with correct totals
```

## TC-22 — Required firstName validation

- **Mode:** Automated / UI setup
- **Priority/type:** P1 / Negative
- **Requirement basis:** A-01, A-02, A-05; see assumptions.md.
- **Rationale:** Prioritize the purchase journey, required-field rejection, recovery and cancel paths. Check the destination and business state, not only a button click.
- **Implementation:** `cypress/e2e/04-checkout.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I reach checkout through the UI with "Sauce Labs Backpack"
When I leave "firstName" blank and complete the other customer fields
And I continue to order review
Then checkout is blocked with "First Name is required"
```

## TC-23 — Required lastName validation

- **Mode:** Automated / UI setup
- **Priority/type:** P1 / Negative
- **Requirement basis:** A-01, A-02, A-05; see assumptions.md.
- **Rationale:** Prioritize the purchase journey, required-field rejection, recovery and cancel paths. Check the destination and business state, not only a button click.
- **Implementation:** `cypress/e2e/04-checkout.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I reach checkout through the UI with "Sauce Labs Backpack"
When I leave "lastName" blank and complete the other customer fields
And I continue to order review
Then checkout is blocked with "Last Name is required"
```

## TC-24 — Required postalCode validation

- **Mode:** Automated / UI setup
- **Priority/type:** P1 / Negative
- **Requirement basis:** A-01, A-02, A-05; see assumptions.md.
- **Rationale:** Prioritize the purchase journey, required-field rejection, recovery and cancel paths. Check the destination and business state, not only a button click.
- **Implementation:** `cypress/e2e/04-checkout.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I reach checkout through the UI with "Sauce Labs Backpack"
When I leave "postalCode" blank and complete the other customer fields
And I continue to order review
Then checkout is blocked with "Postal Code is required"
```

## TC-25 — All checkout fields empty

- **Mode:** Automated / UI setup
- **Priority/type:** P1 / Negative
- **Requirement basis:** A-01, A-02, A-05; see assumptions.md.
- **Rationale:** Prioritize the purchase journey, required-field rejection, recovery and cancel paths. Check the destination and business state, not only a button click.
- **Implementation:** `cypress/e2e/04-checkout.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I reach checkout through the UI with "Sauce Labs Backpack"
When I continue to order review
Then checkout is blocked with "First Name is required"
```

## TC-26 — Recover from validation without losing cart

- **Mode:** Automated / UI setup
- **Priority/type:** P0 / Negative/recovery
- **Requirement basis:** A-01, A-02, A-05; see assumptions.md.
- **Rationale:** Prioritize the purchase journey, required-field rejection, recovery and cancel paths. Check the destination and business state, not only a button click.
- **Implementation:** `cypress/e2e/04-checkout.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I reach checkout through the UI with "Sauce Labs Backpack"
When I leave "postalCode" blank and complete the other customer fields
And I continue to order review
Then checkout is blocked with "Postal Code is required"
When I enter valid customer information
And I continue to order review
Then the review contains "Sauce Labs Backpack" with correct totals
```

## TC-27 — Cancel customer information returns to cart

- **Mode:** Automated / UI setup
- **Priority/type:** P1 / Positive
- **Requirement basis:** A-01, A-02, A-05; see assumptions.md.
- **Rationale:** Prioritize the purchase journey, required-field rejection, recovery and cancel paths. Check the destination and business state, not only a button click.
- **Implementation:** `cypress/e2e/04-checkout.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I reach checkout through the UI with "Sauce Labs Backpack"
When I cancel checkout
Then I return to the cart with "Sauce Labs Backpack"
```

## TC-28 — Cancel review returns to products

- **Mode:** Automated / UI setup
- **Priority/type:** P1 / Positive
- **Requirement basis:** A-01, A-02, A-05; see assumptions.md.
- **Rationale:** Prioritize the purchase journey, required-field rejection, recovery and cancel paths. Check the destination and business state, not only a button click.
- **Implementation:** `cypress/e2e/04-checkout.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I reach checkout through the UI with "Sauce Labs Backpack"
When I enter valid customer information
And I continue to order review
And I cancel checkout
Then I return to products with 1 items retained
```

## TC-29 — Complete two-product purchase through UI

- **Mode:** Automated / UI setup
- **Priority/type:** P0 / Positive/E2E
- **Requirement basis:** A-01, A-02, A-05; see assumptions.md.
- **Rationale:** Prioritize the purchase journey, required-field rejection, recovery and cancel paths. Check the destination and business state, not only a button click.
- **Implementation:** `cypress/e2e/04-checkout.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I reach checkout through the UI with "Sauce Labs Backpack | Sauce Labs Bike Light"
When I enter valid customer information
And I continue to order review
Then the review contains "Sauce Labs Backpack | Sauce Labs Bike Light" with correct totals
When I finish the order
Then the order is confirmed and the cart is cleared
```

## TC-30 — Single-product totals with direct setup

- **Mode:** Automated / direct setup
- **Priority/type:** P1 / Positive
- **Requirement basis:** A-01, A-02, A-05; see assumptions.md.
- **Rationale:** Isolate checkout from repeated login/cart UI setup in exactly five scenarios. These complement, and do not replace, full UI journey coverage.
- **Implementation:** `cypress/e2e/05-focused-checkout.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given checkout is prepared directly with "Sauce Labs Onesie"
When I enter valid customer information
And I continue to order review
Then the review contains "Sauce Labs Onesie" with correct totals
```

## TC-31 — Multi-product totals and rounding

- **Mode:** Automated / direct setup
- **Priority/type:** P0 / Boundary
- **Requirement basis:** A-01, A-02, A-05; see assumptions.md.
- **Rationale:** Isolate checkout from repeated login/cart UI setup in exactly five scenarios. These complement, and do not replace, full UI journey coverage.
- **Implementation:** `cypress/e2e/05-focused-checkout.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given checkout is prepared directly with "Sauce Labs Onesie | Sauce Labs Bike Light | Sauce Labs Fleece Jacket"
When I enter valid customer information
And I continue to order review
Then the review contains "Sauce Labs Onesie | Sauce Labs Bike Light | Sauce Labs Fleece Jacket" with correct totals
```

## TC-32 — Order completion clears prepared cart

- **Mode:** Automated / direct setup
- **Priority/type:** P0 / Positive
- **Requirement basis:** A-01, A-02, A-05; see assumptions.md.
- **Rationale:** Isolate checkout from repeated login/cart UI setup in exactly five scenarios. These complement, and do not replace, full UI journey coverage.
- **Implementation:** `cypress/e2e/05-focused-checkout.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given checkout is prepared directly with "Sauce Labs Backpack"
When I enter valid customer information
And I continue to order review
And I finish the order
Then the order is confirmed and the cart is cleared
```

## TC-33 — Cancel preserves prepared multi-item cart

- **Mode:** Automated / direct setup
- **Priority/type:** P1 / Positive
- **Requirement basis:** A-01, A-02, A-05; see assumptions.md.
- **Rationale:** Isolate checkout from repeated login/cart UI setup in exactly five scenarios. These complement, and do not replace, full UI journey coverage.
- **Implementation:** `cypress/e2e/05-focused-checkout.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given checkout is prepared directly with "Sauce Labs Backpack | Sauce Labs Bike Light"
When I cancel checkout
Then I return to the cart with "Sauce Labs Backpack | Sauce Labs Bike Light"
```

## TC-34 — International customer and leading-zero postal code

- **Mode:** Automated / direct setup
- **Priority/type:** P2 / Boundary
- **Requirement basis:** A-01, A-02, A-05; see assumptions.md.
- **Rationale:** Isolate checkout from repeated login/cart UI setup in exactly five scenarios. These complement, and do not replace, full UI journey coverage.
- **Implementation:** `cypress/e2e/05-focused-checkout.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given checkout is prepared directly with "Sauce Labs Backpack"
When I enter customer information
  | firstName | Zoë |
  | lastName | O'Neil |
  | postalCode | 00123 |
And I continue to order review
Then the review contains "Sauce Labs Backpack" with correct totals
```

## TC-35 — Product image replaced without blocking shopping

- **Mode:** Automated / UI setup
- **Priority/type:** P2 / Positive
- **Requirement basis:** A-06; see assumptions.md.
- **Rationale:** Exercise a genuine image dependency using deterministic fixture substitution and HTTP 404. Assert both the intercepted response and useful UI behavior.
- **Implementation:** `cypress/e2e/06-network.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given the backpack image response is "replaced"
And I am signed in through the UI
Then the "replaced" image response is observed and shopping still works
```

## TC-36 — Product image unavailable without blocking shopping

- **Mode:** Automated / UI setup
- **Priority/type:** P2 / Negative/resilience
- **Requirement basis:** A-06; see assumptions.md.
- **Rationale:** Exercise a genuine image dependency using deterministic fixture substitution and HTTP 404. Assert both the intercepted response and useful UI behavior.
- **Implementation:** `cypress/e2e/06-network.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given the backpack image response is "unavailable"
And I am signed in through the UI
Then the "unavailable" image response is observed and shopping still works
```

## TC-37 — Reject whitespace-only first name

- **Mode:** Automated / proposed requirement
- **Priority/type:** P1 / Negative/assumption
- **Requirement basis:** A-03; see assumptions.md.
- **Rationale:** Evaluate an explicitly proposed business rule. Keep failures separate pending product-owner confirmation; do not weaken the assertion to force green.
- **Implementation:** `cypress/e2e/07-assumptions.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I reach checkout through the UI with "Sauce Labs Backpack"
When I enter customer information
  | firstName | <spaces> |
  | lastName | Tester |
  | postalCode | 02108 |
And I continue to order review
Then whitespace-only first name is rejected under assumption A-03
```

## TC-38 — Prevent empty-cart order

- **Mode:** Automated / proposed requirement
- **Priority/type:** P1 / Negative/assumption
- **Requirement basis:** A-04; see assumptions.md.
- **Rationale:** Evaluate an explicitly proposed business rule. Keep failures separate pending product-owner confirmation; do not weaken the assertion to force green.
- **Implementation:** `cypress/e2e/07-assumptions.feature`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given I am signed in through the UI
When I attempt checkout with an empty cart
Then an empty order is blocked under assumption A-04
```

## TC-39 — Keyboard and screen-reader checkout journey

- **Mode:** Manual / not executed
- **Priority/type:** P1 / Accessibility
- **Requirement basis:** A-01; see assumptions.md.
- **Rationale:** Human judgment is needed for focus clarity, announcements, overlap and readability. These cases are documented but NOT claimed as executed or automated.
- **Implementation:** `Manual checklist below`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given a clean browser with keyboard and a screen reader available
When I navigate login, products, cart and checkout without a mouse
Then focus is visible and logical, controls have meaningful names, errors are discoverable, and there is no keyboard trap
```

Run with Tab/Shift+Tab/Enter/Space and NVDA or an available reader. Record browser/reader versions, focus order, accessible names, error announcement, and any trapped focus. Expected under proposed accessibility baseline: all essential controls operable and understandable. Attach evidence per failure. No WCAG conformance claim.

## TC-40 — Responsive layout and zoom readability

- **Mode:** Manual / not executed
- **Priority/type:** P2 / Usability/boundary
- **Requirement basis:** A-01; see assumptions.md.
- **Rationale:** Human judgment is needed for focus clarity, announcements, overlap and readability. These cases are documented but NOT claimed as executed or automated.
- **Implementation:** `Manual checklist below`
- **Preconditions/data:** Fresh context; public standard_user / secret_sauce unless overridden below; products.json and customer.json are versioned reference data.

```gherkin
Given a standard-user shopping session
When I inspect login, products, cart, information, review and completion at 375x812, 768x1024 and 1280x800 and at 200 percent browser zoom
Then essential content remains readable, controls do not overlap or disappear, and checkout remains usable
```

Record each viewport/page combination and zoom separately as Pass/Fail/Blocked. Check horizontal overflow, clipped errors, obscured buttons and readable order totals. Capture screenshots for failures. Layout expectations are proposed usability criteria.
