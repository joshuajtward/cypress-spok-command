import { errorMessageTemplate } from "../support/testConstants";

Cypress.Commands.add("shouldFail", (errorMessage, useTemplate = true) => {
  cy.on("fail", (e) => {
    const expectedErrorMessage = useTemplate
      ? `${errorMessageTemplate} ${errorMessage}`
      : errorMessage;
    expect(e.message).to.eq(expectedErrorMessage);
  });
});
