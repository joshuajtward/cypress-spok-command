import { spok } from "../../src/index";
import { errorMessageTemplate } from "./testConstants";

Cypress.Commands.add("shouldFail", (errorMessage, useTemplate = true) => {
  cy.on("fail", (e) => {
    const expectedErrorMessage = useTemplate
      ? `${errorMessageTemplate} ${errorMessage}`
      : errorMessage;
    expect(e.message).to.eq(expectedErrorMessage);
  });
});

// @ts-ignore
Cypress.Commands.add("spok", spok);
