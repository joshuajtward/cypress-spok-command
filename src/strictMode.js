function sameKeys(target, matcher) {
  const hasSameKeyCount =
    Object.keys(matcher).length === Object.keys(target).length;
  if (!hasSameKeyCount) {
    return false;
  }
  const targetKeys = Object.keys(target).sort();
  const matcherKeys = Object.keys(matcher).sort();
  return JSON.stringify(targetKeys) === JSON.stringify(matcherKeys);
}
export const strictModeErrorMessage =
  "cy.spok() strictMode error: object keys were not an exact match";
export function testStrictMode(target, matcher) {
  const result = sameKeys(target, matcher);
  Cypress.log({
    name: "strictMode",
    message: `target and matcher have same keys: ${result}`,
  });
  if (!result) {
    throw new Error(strictModeErrorMessage);
  }
}
