import cySpok from "cy-spok";
import { testStrictMode } from "./strictMode";
import { matchRecursively } from "./matcher";

type spokOptionsType = {
  strictMode?: boolean;
};

function spok(
  target: object,
  matcher: object,
  options: spokOptionsType = { strictMode: false }
) {
  const { strictMode } = options;

  Cypress.log({
    name: "spok",
    message: strictMode ? "strictMode: true" : "",
    consoleProps: () => ({
      target,
    }),
  });

  if (strictMode) testStrictMode(target, matcher);
  const finalMatcher = matchRecursively(matcher);
  cy.wrap(target, { log: false }).should(cySpok(finalMatcher));
}
Cypress.Commands.add("spok", spok);

module.exports = spok;
