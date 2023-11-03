import { spok } from "../../src/index";
import { errorMessageTemplate } from "./testConstants";
import type { SpokOptionsType } from "../../src";

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
      spok(target: object, matcher: object, options?: SpokOptionsType): void;
    }
  }
}

Cypress.Commands.add("shouldFail", (errorMessage, useTemplate = true) => {
  cy.on("fail", (e) => {
    const expectedErrorMessage = useTemplate
      ? `${errorMessageTemplate} ${errorMessage}`
      : errorMessage;
    expect(e.message).to.eq(expectedErrorMessage);
  });
});

Cypress.Commands.add("spok", spok);
