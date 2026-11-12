# Network and setup investigation

## Findings

The official Sauce Labs sample source was inspected at commit `d5cd655fa8a974f4ddb6fde2868586e0084211d2`. The public deployment may differ from that commit, so execution against the live UI is the final compatibility check.

- `src/utils/Credentials.js`: credentials are checked against local constants; the session is the `session-username` cookie.
- `src/utils/shopping-cart.js`: cart IDs are serialized into browser localStorage key `cart-contents`.
- `src/utils/InventoryData.js`: catalog products are bundled data.
- Checkout transitions and completion are client-side; no login/cart/order REST endpoint is supplied by this application.
- Product images are genuine HTTP resources. The network scenarios match the observed asset family containing `sauce-backpack` and verify that the interception was actually used.

## Chosen implementation

TC-30–34 seed the cookie and product IDs before page initialization, then test real checkout UI. This gives focused setup without inventing API endpoints. Its coupling to internal storage is explicit and limited to five tests. If storage contracts change, repair the setup adapter; keep complete UI coverage as the independent check.

Live execution showed that the static host returns HTTP 404 for a direct checkout document request. The adapter therefore visits the real root document and uses history.replaceState before React mounts to select the checkout route. It still checks the resulting pathname and session cookie, and does not disable HTTP status validation.

TC-35 substitutes a 64x64 SVG fixture for the backpack image; both response status and decoded dimensions are asserted. TC-36 returns 404 and checks the failed image plus retained product/cart behavior. Intercepts are registered before navigation and cleared by Cypress between tests. The mocked response uses no-store. There is no global telemetry suppression or dummy request issued only to make an intercept pass.

`cy.request()` is not used to pretend to create carts. If an API-backed application is added later, use documented authenticated endpoints for setup, validate their responses, and keep API contract tests separate from UI tests.

## References

- https://github.com/saucelabs/sample-app-web
- https://docs.cypress.io/api/commands/intercept
- https://docs.cypress.io/app/core-concepts/test-isolation
- https://github.com/badeball/cypress-cucumber-preprocessor

These are engineering references; the execution report records actual results against the hosted application.
