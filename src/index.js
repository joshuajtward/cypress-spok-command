/// <reference path="./index.d.ts"/>
const cySpok = require("cy-spok");
import { testStrictMode } from "./strictMode";
import { matchRecursively } from "./matcher";
function spok(target, matcher, options = {}) {
  const { strictMode } = options;

  Cypress.log({
    name: "spok",
    message: strictMode ? "strictMode: true" : "",
    consoleProps: () => ({
      target: target,
    }),
  });

  if (strictMode) testStrictMode(target, matcher);
  const finalMatcher = matchRecursively(matcher);
  cy.wrap(target, { log: false }).should(cySpok(finalMatcher));
}
Cypress.Commands.add("spok", spok);

module.exports = {
  spok,
};
