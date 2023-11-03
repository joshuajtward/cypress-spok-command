import cySpok from "cy-spok";
import { testStrictMode } from "./strictMode";
import { matchRecursively } from "./matcher";

export type SpokOptionsType = {
  strictMode?: boolean;
};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * @param target - the object to be asserted upon
       * @param matcher - the object pattern we are expecting
       * @param options.strictMode - checks whether `target` and `matcher` have the exact same keys
       *
       * Configured spok rules:
       * - spok.array
       * - spok.arrayElements(number)
       * - spok.boolean
       * - spok.defined
       * - spok.definedObject
       * - spok.emptyArray
       * - spok.emptyObject
       * - spok.function
       * - spok.ge(number)
       * - spok.gez
       * - spok.gt(number)
       * - spok.gtz
       * - spok.le(number)
       * - spok.lez
       * - spok.lt(number)
       * - spok.ltz
       * - spok.ne(any)
       * - spok.nonEmptyArray
       * - spok.number
       * - spok.range(number,number)
       * - spok.string
       * - spok.stringLength(number)
       * - spok.test(regex)
       * - spok.type(type)
       *
       * Note:
       * `spok.test()` uses the passed string to construct a Regex object,
       * so passing the string `'spok.test(abc)'` will be evaluated as `spok.test(/abc/)`.
       * Special characters need to be double-escaped, i.e. `'spok.test(\\d{3})'`
       * will be evaluated as `spok.test(/\d{3}/)`.
       *
       * For more info about spok see: https://github.com/thlorenz/spok
       *
       * @example
       * cy.spok(someObject, {
       *   id: 'spok.string',
       *   sections: 'spok.nonEmptyArray',
       *   pattern: 'spok.test(someRegex.*)',
       * })
       *
       * @example
       * // with 'strictMode':
       * cy.spok(someObject, {
       *     id: 'spok.string',
       *     sections: 'spok.nonEmptyArray',
       *     pattern: 'spok.test(someRegex.*)',
       *   },
       *   { strictMode: true }
       * )
       */
      spok(target: any, matcher: any, options?: { strictMode?: boolean }): any;
    }
  }
}

Cypress.Commands.add(
  "spok",
  (
    target: object,
    matcher: object,
    options: SpokOptionsType = { strictMode: false }
  ) => {
    const { strictMode } = options;

    Cypress.log({
      name: "spok",
      message: strictMode ? "strictMode: true" : "",
      consoleProps: () => ({ target }),
    });

    if (strictMode) testStrictMode(target, matcher);
    const finalMatcher = matchRecursively(matcher);
    cy.wrap(target, { log: false }).should(cySpok(finalMatcher));
  }
);
