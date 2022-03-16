import { strictModeErrorMessage } from "../../src/strictMode";

module.exports = {
  errorMessageTemplate: `Timed out retrying after ${Cypress.config(
    "defaultCommandTimeout"
  )}ms:`,
  strictModeErrorMessage,
};
