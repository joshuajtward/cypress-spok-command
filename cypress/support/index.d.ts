declare namespace Cypress {
  interface Chainable {
    /**
     * Place this at the start of your test to assert that it fails
     *
     * @param expectedErrorMessage - the expected error message
     * @param useTemplate - whether to use Cypress' default error message in the template
     */
    shouldFail(expectedErrorMessage: string, useTemplate?: boolean): any;
    spok(): any;
  }
}
