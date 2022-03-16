import { ruleMatcher } from "./rules";
import { regexes } from "./regexes";

const { spokRegex } = regexes;

export function matchRecursively(object) {
  let newMatcher = {};
  for (let [key, value] of Object.entries(object)) {
    let result = value;
    if (typeof value === "string" && value.match(spokRegex)) {
      result = ruleMatcher(value);
    }
    if (typeof value === "object" && !Array.isArray(value)) {
      newMatcher[key] = {};
      result = matchRecursively(value);
    }
    newMatcher[key] = result;
  }
  return newMatcher;
}
