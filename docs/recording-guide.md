# Recording preparation and walkthrough

The candidate will choose two cases after reviewing the working project. Suggested pair: TC-29 (full purchase) and TC-26 (validation/recovery). Both belong to the smoke and regression suites. Select the checkout feature interactively when practicing.

## Preparation before recording

1. Read the written design and assumptions. Freeze the two chosen case descriptions before recording.
2. Understand every step and helper used by those cases. Practice explaining why the assertions matter.
3. Preserve the working baseline with Git. Create a separate practice branch before removing implementation; do not erase the only working copy.
4. Identify the actual implementation to recreate: deleting only two Gherkin scenarios while leaving all their code untouched would show scenario authoring, not much automation implementation. Recreate selected step bindings/page or flow methods too, carefully checking their other usages.
5. Keep the original written cases in docs/test-cases.md. They must exist before coding. Prepare tools/dependencies/configuration; disclose that the framework was prepared beforehand.
6. Test the microphone and screen capture. Do not record personal tabs, passwords or unrelated documents. Cypress's generated video does not record your editor or narration.

## Suggested TC-29 sequence

1. Introduce the purchase risk and expected cart items. Show the prewritten case.
2. Write the scenario using the same case ID and selected products.
3. Implement/decompose the UI login and add-to-cart flow. Explain stable selectors and scoped product cards.
4. Implement customer input and review assertions: exact items, fixed reference prices, subtotal, 8% assumed tax and total. For Backpack + Bike Light the expected subtotal is 39.98, tax 3.20, total 43.18.
5. Implement Finish and confirmation assertions, then verify cart clearance through the visible cart.
6. Run the chosen case and inspect the result. Explain why checking only a success URL would be insufficient.

## Suggested TC-26 sequence

1. Show the prewritten validation/recovery case and its rationale.
2. Reach checkout with a product through UI setup.
3. Omit postalCode while supplying firstName and lastName.
4. Assert both the exact error and that the page remains at the information step.
5. Correct the information and continue; assert original item and correct totals at review.
6. Explain parameterized field input and how the separate required-field Scenario Outline reuses it.

## Run and explain

```sh
npm run lint
npm run check:coverage
npm run test:smoke
npm run report:serve
```

During development, narrow by feature or select the desired scenario in the interactive runner. Preserve final traceability and restore all selected implementation before handover. Explain failures honestly if they occur. Do not claim a prepared replay or an execution-only video is live implementation.

End by showing the report and discussing limitations: five white-box setup cases, image mocking rather than nonexistent APIs, two proposed-rule findings, manual checks not yet performed. Upload the actual narrated video separately and verify accessibility of both video and public repository before submitting.

## Refactored implementation map

For TC-26 and TC-29, use steps/checkout.steps.js, flows/shopping.js and the checkout-information, checkout-review and checkout-complete page objects under cypress/. Shared login uses flows/authentication.js. The twoProducts basket references backpack and bikeLight in fixtures/products.json; customer values come from fixtures/customers.json. Explain fixture keys, independent expected prices and the assumed tax rule while recording. Do not recreate shared step definitions in a second file: all step files are registered globally.
