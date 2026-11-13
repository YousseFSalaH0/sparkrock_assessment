# Test case specification

43 cases: 41 automated and 2 manual (not executed). Smoke selects 4, regression selects 29, and full regression selects all 41 automated cases, including two proposed-rule failures. Each automated scenario starts with isolated browser state. IDs remain in scenario titles for report traceability; redundant ID tags are removed.

Requirements are reconstructed for this exercise; see assumptions.md. Expected assertions are not execution results; see execution-results.md. P0 is critical, P1 significant functional risk, and P2 supporting behavior.

## Traceability matrix

| ID    | Area             | Title                                               | Type                | Priority | Execution mode                   |
| ----- | ---------------- | --------------------------------------------------- | ------------------- | -------- | -------------------------------- |
| TC-01 | Authentication   | Valid standard login                                | Positive            | P0       | Automated / UI setup             |
| TC-02 | Authentication   | Login validation - Incorrect password               | Negative            | P1       | Automated / UI setup             |
| TC-03 | Authentication   | Login validation - Unknown username                 | Negative            | P1       | Automated / UI setup             |
| TC-04 | Authentication   | Login validation - Missing username                 | Negative            | P1       | Automated / UI setup             |
| TC-05 | Authentication   | Login validation - Missing password                 | Negative            | P1       | Automated / UI setup             |
| TC-06 | Authentication   | Login validation - Both login fields empty          | Negative            | P1       | Automated / UI setup             |
| TC-07 | Authentication   | Login validation - Locked-out account               | Negative            | P1       | Automated / UI setup             |
| TC-08 | Authentication   | Logout protects direct inventory navigation         | Negative            | P0       | Automated / UI setup             |
| TC-09 | Catalog          | Catalog completeness and price integrity            | Positive            | P1       | Automated / UI setup             |
| TC-10 | Catalog          | Product sorting nameAscending                       | Positive            | P2       | Automated / UI setup             |
| TC-11 | Catalog          | Product sorting nameDescending                      | Positive            | P2       | Automated / UI setup             |
| TC-12 | Catalog          | Product sorting priceAscending                      | Positive            | P2       | Automated / UI setup             |
| TC-13 | Catalog          | Product sorting priceDescending                     | Positive            | P2       | Automated / UI setup             |
| TC-14 | Catalog          | Product details and return navigation - backpack    | Positive            | P1       | Automated / UI setup             |
| TC-15 | Cart             | Add one product and update badge                    | Positive            | P0       | Automated / UI setup             |
| TC-16 | Cart             | Remove from catalog resets badge                    | Boundary            | P1       | Automated / UI setup             |
| TC-17 | Cart             | Remove final product from cart                      | Boundary            | P1       | Automated / UI setup             |
| TC-18 | Cart             | Cart survives page reload                           | Positive            | P1       | Automated / UI setup             |
| TC-19 | Cart             | Continue shopping preserves selection               | Positive            | P2       | Automated / UI setup             |
| TC-20 | Cart             | All available products retained once                | Boundary            | P1       | Automated / UI setup             |
| TC-21 | Checkout         | Valid information advances to correct review        | Positive            | P0       | Automated / UI setup             |
| TC-22 | Checkout         | Required checkout field missingFirstName            | Negative            | P1       | Automated / UI setup             |
| TC-23 | Checkout         | Required checkout field missingLastName             | Negative            | P1       | Automated / UI setup             |
| TC-24 | Checkout         | Required checkout field missingPostalCode           | Negative            | P1       | Automated / UI setup             |
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
| TC-35 | Network          | Product image resilience - replacementImage         | Positive            | P2       | Automated / UI setup             |
| TC-36 | Network          | Product image resilience - missingImage             | Negative/resilience | P2       | Automated / UI setup             |
| TC-37 | Assumptions      | Reject whitespace-only first name                   | Negative/assumption | P1       | Automated / proposed requirement |
| TC-38 | Assumptions      | Prevent empty-cart order                            | Negative/assumption | P1       | Automated / proposed requirement |
| TC-39 | Manual           | Keyboard and screen-reader checkout journey         | Accessibility       | P1       | Manual / not executed            |
| TC-40 | Manual           | Responsive layout and zoom readability              | Usability/boundary  | P2       | Manual / not executed            |
| TC-41 | Authentication   | Login validation - Both credentials incorrect       | Negative            | P1       | Automated / UI setup             |
| TC-42 | Catalog          | Product details and return navigation - bikeLight   | Positive            | P1       | Automated / UI setup             |
| TC-43 | Catalog          | Product details and return navigation - onesie      | Positive            | P1       | Automated / UI setup             |

## TC-01: Valid standard login

Positive; P0; Automated / UI setup.

Source: `cypress/e2e/01-authentication.feature`.

```gherkin
Given I am on the login page
When I log in using "validUser" credentials
Then the product catalog is displayed
```

## TC-02: Login validation - Incorrect password

Negative; P1; Automated / UI setup.

Source: `cypress/e2e/01-authentication.feature`.

```gherkin
Given I am on the login page
When I log in using "wrongPassword" credentials
Then login is rejected for "wrongPassword" credentials
```

## TC-03: Login validation - Unknown username

Negative; P1; Automated / UI setup.

Source: `cypress/e2e/01-authentication.feature`.

```gherkin
Given I am on the login page
When I log in using "wrongUsername" credentials
Then login is rejected for "wrongUsername" credentials
```

## TC-04: Login validation - Missing username

Negative; P1; Automated / UI setup.

Source: `cypress/e2e/01-authentication.feature`.

```gherkin
Given I am on the login page
When I log in using "emptyUsername" credentials
Then login is rejected for "emptyUsername" credentials
```

## TC-05: Login validation - Missing password

Negative; P1; Automated / UI setup.

Source: `cypress/e2e/01-authentication.feature`.

```gherkin
Given I am on the login page
When I log in using "emptyPassword" credentials
Then login is rejected for "emptyPassword" credentials
```

## TC-06: Login validation - Both login fields empty

Negative; P1; Automated / UI setup.

Source: `cypress/e2e/01-authentication.feature`.

```gherkin
Given I am on the login page
When I log in using "bothEmpty" credentials
Then login is rejected for "bothEmpty" credentials
```

## TC-07: Login validation - Locked-out account

Negative; P1; Automated / UI setup.

Source: `cypress/e2e/01-authentication.feature`.

```gherkin
Given I am on the login page
When I log in using "lockedUser" credentials
Then login is rejected for "lockedUser" credentials
```

## TC-08: Logout protects direct inventory navigation

Negative; P0; Automated / UI setup.

Source: `cypress/e2e/01-authentication.feature`.

```gherkin
Given I am signed in through the UI
When I log out and revisit the inventory URL
Then I must sign in again
```

## TC-09: Catalog completeness and price integrity

Positive; P1; Automated / UI setup.

Source: `cypress/e2e/02-catalog.feature`.

```gherkin
Given I am signed in through the UI
Then all reference products have the expected names prices and descriptions
```

## TC-10: Product sorting nameAscending

Positive; P2; Automated / UI setup.

Source: `cypress/e2e/02-catalog.feature`.

```gherkin
Given I am signed in through the UI
When I sort products by "nameAscending"
Then products are ordered by "nameAscending"
```

## TC-11: Product sorting nameDescending

Positive; P2; Automated / UI setup.

Source: `cypress/e2e/02-catalog.feature`.

```gherkin
Given I am signed in through the UI
When I sort products by "nameDescending"
Then products are ordered by "nameDescending"
```

## TC-12: Product sorting priceAscending

Positive; P2; Automated / UI setup.

Source: `cypress/e2e/02-catalog.feature`.

```gherkin
Given I am signed in through the UI
When I sort products by "priceAscending"
Then products are ordered by "priceAscending"
```

## TC-13: Product sorting priceDescending

Positive; P2; Automated / UI setup.

Source: `cypress/e2e/02-catalog.feature`.

```gherkin
Given I am signed in through the UI
When I sort products by "priceDescending"
Then products are ordered by "priceDescending"
```

## TC-14: Product details and return navigation - backpack

Positive; P1; Automated / UI setup.

Source: `cypress/e2e/02-catalog.feature`.

```gherkin
Given I am signed in through the UI
When I open the details for product "backpack"
Then the details match product "backpack" and I can return to the catalog
```

## TC-15: Add one product and update badge

Positive; P0; Automated / UI setup.

Source: `cypress/e2e/03-cart.feature`.

```gherkin
Given I am signed in through the UI
When I add basket "singleProduct" to the cart
Then the cart badge matches basket "singleProduct"
When I open the cart
Then the cart contains basket "singleProduct"
```

## TC-16: Remove from catalog resets badge

Boundary; P1; Automated / UI setup.

Source: `cypress/e2e/03-cart.feature`.

```gherkin
Given I am signed in through the UI
When I add basket "singleProduct" to the cart
And I remove basket "singleProduct" from the catalog
Then the cart badge is absent
When I open the cart
Then the cart is empty
```

## TC-17: Remove final product from cart

Boundary; P1; Automated / UI setup.

Source: `cypress/e2e/03-cart.feature`.

```gherkin
Given I am signed in through the UI
When I add basket "singleProduct" to the cart
And I open the cart
And I remove basket "singleProduct" from the cart
Then the cart is empty
```

## TC-18: Cart survives page reload

Positive; P1; Automated / UI setup.

Source: `cypress/e2e/03-cart.feature`.

```gherkin
Given I am signed in through the UI
When I add basket "singleProduct" to the cart
And I open the cart
And I reload the page
Then the cart contains basket "singleProduct"
And the cart badge matches basket "singleProduct"
```

## TC-19: Continue shopping preserves selection

Positive; P2; Automated / UI setup.

Source: `cypress/e2e/03-cart.feature`.

```gherkin
Given I am signed in through the UI
When I add basket "singleProduct" to the cart
And I open the cart
And I continue shopping
Then the product catalog is displayed
And the cart badge matches basket "singleProduct"
```

## TC-20: All available products retained once

Boundary; P1; Automated / UI setup.

Source: `cypress/e2e/03-cart.feature`.

```gherkin
Given I am signed in through the UI
When I add basket "allProducts" to the cart
Then the cart badge matches basket "allProducts"
When I open the cart
Then the cart contains basket "allProducts"
```

## TC-21: Valid information advances to correct review

Positive; P0; Automated / UI setup.

Source: `cypress/e2e/04-checkout.feature`.

```gherkin
Given I reach checkout through the UI with basket "singleProduct"
When I enter customer information using "validCustomer"
And I continue to order review
Then the review contains basket "singleProduct" with correct totals
```

## TC-22: Required checkout field missingFirstName

Negative; P1; Automated / UI setup.

Source: `cypress/e2e/04-checkout.feature`.

```gherkin
Given I reach checkout through the UI with basket "singleProduct"
When I enter customer information using "missingFirstName"
And I continue to order review
Then checkout is blocked for customer "missingFirstName"
```

## TC-23: Required checkout field missingLastName

Negative; P1; Automated / UI setup.

Source: `cypress/e2e/04-checkout.feature`.

```gherkin
Given I reach checkout through the UI with basket "singleProduct"
When I enter customer information using "missingLastName"
And I continue to order review
Then checkout is blocked for customer "missingLastName"
```

## TC-24: Required checkout field missingPostalCode

Negative; P1; Automated / UI setup.

Source: `cypress/e2e/04-checkout.feature`.

```gherkin
Given I reach checkout through the UI with basket "singleProduct"
When I enter customer information using "missingPostalCode"
And I continue to order review
Then checkout is blocked for customer "missingPostalCode"
```

## TC-25: All checkout fields empty

Negative; P1; Automated / UI setup.

Source: `cypress/e2e/04-checkout.feature`.

```gherkin
Given I reach checkout through the UI with basket "singleProduct"
When I enter customer information using "emptyCustomer"
And I continue to order review
Then checkout is blocked for customer "emptyCustomer"
```

## TC-26: Recover from validation without losing cart

Negative/recovery; P0; Automated / UI setup.

Source: `cypress/e2e/04-checkout.feature`.

```gherkin
Given I reach checkout through the UI with basket "singleProduct"
When I enter customer information using "missingPostalCode"
And I continue to order review
Then checkout is blocked for customer "missingPostalCode"
When I enter customer information using "validCustomer"
And I continue to order review
Then the review contains basket "singleProduct" with correct totals
```

## TC-27: Cancel customer information returns to cart

Positive; P1; Automated / UI setup.

Source: `cypress/e2e/04-checkout.feature`.

```gherkin
Given I reach checkout through the UI with basket "singleProduct"
When I cancel customer information
Then I return to the cart with basket "singleProduct"
```

## TC-28: Cancel review returns to products

Positive; P1; Automated / UI setup.

Source: `cypress/e2e/04-checkout.feature`.

```gherkin
Given I reach checkout through the UI with basket "singleProduct"
When I enter customer information using "validCustomer"
And I continue to order review
And I cancel order review
Then I return to products with basket "singleProduct" retained
```

## TC-29: Complete two-product purchase through UI

Positive/E2E; P0; Automated / UI setup.

Source: `cypress/e2e/04-checkout.feature`.

```gherkin
Given I reach checkout through the UI with basket "twoProducts"
When I enter customer information using "validCustomer"
And I continue to order review
Then the review contains basket "twoProducts" with correct totals
When I finish the order
Then the order is confirmed and the cart is cleared
```

## TC-30: Single-product totals with direct setup

Positive; P1; Automated / direct setup.

Source: `cypress/e2e/05-focused-checkout.feature`.

```gherkin
Given checkout is prepared directly with basket "lowPriceProduct"
When I enter customer information using "validCustomer"
And I continue to order review
Then the review contains basket "lowPriceProduct" with correct totals
```

## TC-31: Multi-product totals and rounding

Boundary; P0; Automated / direct setup.

Source: `cypress/e2e/05-focused-checkout.feature`.

```gherkin
Given checkout is prepared directly with basket "roundingBasket"
When I enter customer information using "validCustomer"
And I continue to order review
Then the review contains basket "roundingBasket" with correct totals
```

## TC-32: Order completion clears prepared cart

Positive; P0; Automated / direct setup.

Source: `cypress/e2e/05-focused-checkout.feature`.

```gherkin
Given checkout is prepared directly with basket "singleProduct"
When I enter customer information using "validCustomer"
And I continue to order review
And I finish the order
Then the order is confirmed and the cart is cleared
```

## TC-33: Cancel preserves prepared multi-item cart

Positive; P1; Automated / direct setup.

Source: `cypress/e2e/05-focused-checkout.feature`.

```gherkin
Given checkout is prepared directly with basket "twoProducts"
When I cancel customer information
Then I return to the cart with basket "twoProducts"
```

## TC-34: International customer and leading-zero postal code

Boundary; P2; Automated / direct setup.

Source: `cypress/e2e/05-focused-checkout.feature`.

```gherkin
Given checkout is prepared directly with basket "singleProduct"
When I enter customer information using "internationalCustomer"
And I continue to order review
Then the review contains basket "singleProduct" with correct totals
```

## TC-35: Product image resilience - replacementImage

Positive; P2; Automated / UI setup.

Source: `cypress/e2e/06-network.feature`.

```gherkin
Given the product image uses network case "replacementImage"
And I am signed in through the UI
Then network case "replacementImage" is observed and shopping still works
```

## TC-36: Product image resilience - missingImage

Negative/resilience; P2; Automated / UI setup.

Source: `cypress/e2e/06-network.feature`.

```gherkin
Given the product image uses network case "missingImage"
And I am signed in through the UI
Then network case "missingImage" is observed and shopping still works
```

## TC-37: Reject whitespace-only first name

Negative/assumption; P1; Automated / proposed requirement.

Source: `cypress/e2e/07-assumptions.feature`.

```gherkin
Given I reach checkout through the UI with basket "singleProduct"
When I enter customer information using "whitespaceFirstName"
And I continue to order review
Then whitespace-only first name is rejected under assumption A-03
```

## TC-38: Prevent empty-cart order

Negative/assumption; P1; Automated / proposed requirement.

Source: `cypress/e2e/07-assumptions.feature`.

```gherkin
Given I am signed in through the UI
When I attempt checkout with an empty cart
Then an empty order is blocked under assumption A-04
```

## TC-39: Keyboard and screen-reader checkout journey

Accessibility; P1; Manual / not executed.

```gherkin
Given a clean browser with keyboard and a screen reader available
When I navigate login, products, cart and checkout without a mouse
Then focus is visible and logical, controls have meaningful names, errors are discoverable, and there is no keyboard trap
```

## TC-40: Responsive layout and zoom readability

Usability/boundary; P2; Manual / not executed.

```gherkin
Given a standard-user shopping session
When I inspect login, products, cart, information, review and completion at 375x812, 768x1024 and 1280x800 and at 200 percent browser zoom
Then essential content remains readable, controls do not overlap or disappear, and checkout remains usable
```

## TC-41: Login validation - Both credentials incorrect

Negative; P1; Automated / UI setup.

Source: `cypress/e2e/01-authentication.feature`.

```gherkin
Given I am on the login page
When I log in using "bothWrong" credentials
Then login is rejected for "bothWrong" credentials
```

## TC-42: Product details and return navigation - bikeLight

Positive; P1; Automated / UI setup.

Source: `cypress/e2e/02-catalog.feature`.

```gherkin
Given I am signed in through the UI
When I open the details for product "bikeLight"
Then the details match product "bikeLight" and I can return to the catalog
```

## TC-43: Product details and return navigation - onesie

Positive; P1; Automated / UI setup.

Source: `cypress/e2e/02-catalog.feature`.

```gherkin
Given I am signed in through the UI
When I open the details for product "onesie"
Then the details match product "onesie" and I can return to the catalog
```

## Named test datasets

Keys in scenarios resolve through `cypress/data/test-data.js`. Fixtures supply deterministic reference values, not randomly selected products or values scraped from the page being checked. Scenario Outlines with Examples execute multiple datasets. Suite tags are @smoke, @regression and @full-regression; loading a fixture alone does not multiply a scenario.

### products.json

```json
{
  "bikeLight": {
    "id": 0,
    "name": "Sauce Labs Bike Light",
    "price": 9.99
  },
  "boltShirt": {
    "id": 1,
    "name": "Sauce Labs Bolt T-Shirt",
    "price": 15.99
  },
  "onesie": {
    "id": 2,
    "name": "Sauce Labs Onesie",
    "price": 7.99
  },
  "redShirt": {
    "id": 3,
    "name": "Test.allTheThings() T-Shirt (Red)",
    "price": 15.99
  },
  "backpack": {
    "id": 4,
    "name": "Sauce Labs Backpack",
    "price": 29.99,
    "imageUrlPattern": "**/*sauce-backpack*"
  },
  "fleeceJacket": {
    "id": 5,
    "name": "Sauce Labs Fleece Jacket",
    "price": 49.99
  }
}
```

### baskets.json

```json
{
  "singleProduct": ["backpack"],
  "twoProducts": ["backpack", "bikeLight"],
  "lowPriceProduct": ["onesie"],
  "roundingBasket": ["onesie", "bikeLight", "fleeceJacket"],
  "allProducts": ["bikeLight", "boltShirt", "onesie", "redShirt", "backpack", "fleeceJacket"]
}
```

### customers.json

```json
{
  "validCustomer": {
    "firstName": "Alex",
    "lastName": "Tester",
    "postalCode": "02108"
  },
  "missingFirstName": {
    "firstName": "",
    "lastName": "Tester",
    "postalCode": "02108",
    "expectedError": "First Name is required"
  },
  "missingLastName": {
    "firstName": "Alex",
    "lastName": "",
    "postalCode": "02108",
    "expectedError": "Last Name is required"
  },
  "missingPostalCode": {
    "firstName": "Alex",
    "lastName": "Tester",
    "postalCode": "",
    "expectedError": "Postal Code is required"
  },
  "internationalCustomer": {
    "firstName": "Zoë",
    "lastName": "O'Neil",
    "postalCode": "00123"
  },
  "whitespaceFirstName": {
    "firstName": "   ",
    "lastName": "Tester",
    "postalCode": "02108"
  },
  "emptyCustomer": {
    "firstName": "",
    "lastName": "",
    "postalCode": "",
    "expectedError": "First Name is required"
  }
}
```

### credentials.json

```json
{
  "validUser": {
    "username": "standard_user",
    "password": "secret_sauce"
  },
  "wrongPassword": {
    "username": "standard_user",
    "password": "incorrect",
    "expectedError": "Username and password do not match any user in this service"
  },
  "wrongUsername": {
    "username": "unknown_person",
    "password": "secret_sauce",
    "expectedError": "Username and password do not match any user in this service"
  },
  "emptyUsername": {
    "username": "",
    "password": "secret_sauce",
    "expectedError": "Username is required"
  },
  "emptyPassword": {
    "username": "standard_user",
    "password": "",
    "expectedError": "Password is required"
  },
  "bothEmpty": {
    "username": "",
    "password": "",
    "expectedError": "Username is required"
  },
  "lockedUser": {
    "username": "locked_out_user",
    "password": "secret_sauce",
    "expectedError": "Sorry, this user has been locked out."
  },
  "bothWrong": {
    "username": "unknown_person",
    "password": "incorrect",
    "expectedError": "Username and password do not match any user in this service"
  }
}
```

### sort-orders.json

```json
{
  "nameAscending": {
    "option": "az",
    "field": "name",
    "descending": false
  },
  "nameDescending": {
    "option": "za",
    "field": "name",
    "descending": true
  },
  "priceAscending": {
    "option": "lohi",
    "field": "price",
    "descending": false
  },
  "priceDescending": {
    "option": "hilo",
    "field": "price",
    "descending": true
  }
}
```

### network-cases.json

```json
{
  "replacementImage": {
    "product": "backpack",
    "statusCode": 200,
    "fixture": "replacement.svg",
    "contentType": "image/svg+xml",
    "naturalWidth": 64
  },
  "missingImage": {
    "product": "backpack",
    "statusCode": 404,
    "body": "",
    "naturalWidth": 0
  }
}
```

### business-rules.json

```json
{
  "taxRate": 0.08,
  "requirementBasis": "A-02: proposed/reference tax rule; confirm with product owner"
}
```
