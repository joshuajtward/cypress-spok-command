const stringifySortKeys = (object: object) => JSON.stringify(Object.keys(object).sort());
const sameKeys = (target: object, matcher: object) => stringifySortKeys(target) === stringifySortKeys(matcher);

export const strictModeErrorMessage =
  "cy.spok() strictMode error: object keys were not an exact match";
export function testStrictMode(target: object, matcher: object) {
  const result = sameKeys(target, matcher);
  Cypress.log({
    name: "strictMode",
    message: `target and matcher have same keys: ${result}`,
  });
  if (!result) throw new Error(strictModeErrorMessage);
}