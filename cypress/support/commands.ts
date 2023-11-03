import { errorMessageTemplate } from "./testConstants";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Place this at the start of your test to assert that it fails
       *
       * @param expectedErrorMessage - the expected error message
       * @param useTemplate - whether to use Cypress' default error message in the template
       */
      shouldFail(expectedErrorMessage: string, useTemplate?: boolean): any;
    }
  }
}

Cypress.Commands.add("shouldFail", (errorMessage, useTemplate = true) =>
  cy.on("fail", (e) =>
    expect(e.message).to.eq(
      useTemplate ? `${errorMessageTemplate} ${errorMessage}` : errorMessage
    )
  )
);
