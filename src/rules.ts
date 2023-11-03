import cySpok from "cy-spok";
import { regexes } from "./regexes";

const {
  spokArrayElementsRegex,
  spokGeRegex,
  spokGtRegex,
  spokLeRegex,
  spokLtRegex,
  spokNeRegex,
  spokRangeRegex,
  spokSLRegex,
  spokTestRegex,
  spokTypeRegex,
} = regexes;

/* 
  Taking spok functions as strings and returning the composed spok functions
*/
export const ruleMatcher = (value: any) => {
  switch (value) {
    case "spok.array":
      value = cySpok.array;
      break;
    // spok.arrayElements
    case value.match(spokArrayElementsRegex)?.input:
      value = cySpok.arrayElements(
        Number(value.match(spokArrayElementsRegex)[1])
      );
      break;
    case "spok.boolean":
      value = cySpok.type("boolean");
      break;
    case "spok.defined":
      value = cySpok.defined;
      break;
    case "spok.definedObject":
      value = cySpok.definedObject;
      break;
    case "spok.emptyArray":
      value = [];
      break;
    case "spok.emptyObject":
      value = {};
      break;
    case "spok.function":
      value = cySpok.function;
      break;
    // spok.ge
    case value.match(spokGeRegex)?.input:
      value = cySpok.ge(Number(value.match(spokGeRegex)[1]));
      break;
    case "spok.gez":
      value = cySpok.gez;
      break;
    // spok.gt
    case value.match(spokGtRegex)?.input:
      value = cySpok.gt(Number(value.match(spokGtRegex)[1]));
      break;
    case "spok.gtz":
      value = cySpok.gtz;
      break;
    // spok.le
    case value.match(spokLeRegex)?.input:
      value = cySpok.le(Number(value.match(spokLeRegex)[1]));
      break;
    case "spok.lez":
      value = cySpok.lez;
      break;
    // spok.lt
    case value.match(spokLtRegex)?.input:
      value = cySpok.lt(Number(value.match(spokLtRegex)[1]));
      break;
    case "spok.ltz":
      value = cySpok.ltz;
      break;
    // spok.ne
    case value.match(spokNeRegex)?.input:
      value = cySpok.ne(Number(value.match(spokNeRegex)[1]));
      break;
    case "spok.nonEmptyArray":
      value = cySpok.arrayElementsRange(1, 999999999);
      break;
    case "spok.notDefined":
      value = cySpok.notDefined;
      break;
    case "spok.number":
      value = cySpok.number;
      break;
    case "spok.string":
      value = cySpok.string;
      break;
    // spok.range
    case value.match(spokRangeRegex)?.input:
      value = cySpok.range(
        Number(value.match(spokRangeRegex)[1]),
        Number(value.match(spokRangeRegex)[2])
      );
      break;
    // spok.stringLength
    case value.match(spokSLRegex)?.input:
      value = cySpok.test(new RegExp(`.{${value.match(spokSLRegex)[1]}}`));
      break;
    // spok.test
    case value.match(spokTestRegex)?.input:
      // extract the regex value from the passed string and execute the match
      value = cySpok.test(new RegExp(value.match(spokTestRegex)[1]));
      break;
    // spok.type
    case value.match(spokTypeRegex)?.input:
      value = cySpok.type(value.match(spokTypeRegex)[1]);
      break;
    default:
      Cypress.log({
        name: "literal",
        message: `using literal value: "${value}"`,
      });
  }

  return value;
}
