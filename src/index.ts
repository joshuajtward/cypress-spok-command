import cySpok from "cy-spok";
import { testStrictMode } from "./strictMode";
import { matchRecursively } from "./matcher";

Cypress.Commands.add(
  // @ts-expect-error issue referring types in `index.d.ts`
  "spok",
  (target, matcher, options = { strictMode: false }) => {
    const { strictMode } = options;

    Cypress.log({
      name: "spok",
      message: strictMode ? "strictMode: true" : "",
      consoleProps: () => ({ target }),
    });

    if (strictMode) testStrictMode(target as object, matcher);
    const finalMatcher = matchRecursively(matcher);
    cy.wrap(target, { log: false }).should(cySpok(finalMatcher));
  }
);
