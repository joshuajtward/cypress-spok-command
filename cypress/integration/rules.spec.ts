/// <reference path="../support/index.d.ts" />
import { errorMessageTemplate } from "../support/testConstants";

const mixedArray = ["a", "b", 1, "string"];

describe("spok.array", () => {
  it("passes with a mixed array", () => {
    cy.spok({ foo: mixedArray }, { foo: "spok.array" });
  });

  it("passes with an empty array", () => {
    cy.spok({ foo: [] }, { foo: "spok.array" });
  });

  it("fails when the target is not an array", () => {
    cy.shouldFail("foo = 'not an array'  satisfies: spok.array");
    cy.spok({ foo: "not an array" }, { foo: "spok.array" });
  });
});

describe("spok.arrayElements()", () => {
  it("passes with a mixed array", () => {
    cy.spok({ foo: mixedArray }, { foo: "spok.arrayElements(4)" });
  });

  it("passes with string interpolation", () => {
    const someNumber = 4;
    cy.spok({ foo: mixedArray }, { foo: `spok.arrayElements(${someNumber})` });
  });

  it("passes with an empty array", () => {
    cy.spok({ foo: [] }, { foo: "spok.arrayElements(0)" });
  });

  it("fails when the length is incorrect", () => {
    cy.shouldFail(
      "foo = [ 'a', 'b', 1, 'string' ]  satisfies: spok.arrayElements(5)"
    );
    cy.spok({ foo: mixedArray }, { foo: "spok.arrayElements(5)" });
  });

  it("fails when the value is not a number", () => {
    cy.shouldFail(
      "foo = [ 'a', 'b', 1, 'string' ]  satisfies: spok.arrayElements(NaN)"
    );
    cy.spok({ foo: mixedArray }, { foo: "spok.arrayElements(abc)" });
  });
});

describe("spok.boolean", () => {
  it("passes when the field is a boolean", () => {
    cy.spok({ foo: true }, { foo: "spok.boolean" });
    cy.spok({ foo: false }, { foo: "spok.boolean" });
  });

  it("fails when the value is not a boolean", () => {
    cy.shouldFail("foo = 'false'  satisfies: spok.type(boolean)");
    cy.spok({ foo: "false" }, { foo: "spok.boolean" });
  });
});

describe("spok.defined", () => {
  it("passes when the field is defined", () => {
    cy.spok({ foo: "a string" }, { foo: "spok.defined" });
  });

  it("fails when the field is undefined", () => {
    cy.shouldFail("bar = undefined  satisfies: spok.defined");
    cy.spok({ foo: "a string" }, { bar: "spok.defined" });
  });
});

describe("spok.definedObject", () => {
  it("passes when the field is a defined object", () => {
    cy.spok({ foo: { bar: "a string" } }, { foo: "spok.definedObject" });
  });

  it("passes when the field is an empty object", () => {
    cy.spok({ foo: {} }, { foo: "spok.definedObject" });
  });

  it("fails when the field is undefined", () => {
    cy.shouldFail("bar = undefined  satisfies: spok.definedObject");
    cy.spok({ foo: {} }, { bar: "spok.definedObject" });
  });

  it("fails when the field is not an object", () => {
    cy.shouldFail("foo = 3  satisfies: spok.definedObject");
    cy.spok({ foo: 3 }, { foo: "spok.definedObject" });
  });
});

describe("spok.emptyArray", () => {
  it("passes when the field is an empty array", () => {
    cy.spok({ foo: [] }, { foo: "spok.emptyArray" });
  });

  it("fails when the field is a non-empty array", () => {
    cy.spok({ foo: ["a", 9] }, { foo: "spok.emptyArray" });
    cy.on("fail", (e) =>
      expect(e.message).to.eq(`${errorMessageTemplate} foo = [ 'a', 9 ]`)
    );
  });

  it("fails when the field is not an array", () => {
    cy.shouldFail("foo = { a: 'b' }");
    cy.spok({ foo: { a: "b" } }, { foo: "spok.emptyArray" });
  });
});

describe("spok.emptyObject", () => {
  it("passes when the field is an empty object", () => {
    cy.spok({ foo: {} }, { foo: "spok.emptyObject" });
  });

  it("fails when the field is a non-empty object", () => {
    cy.shouldFail("foo = { a: 1 }");
    cy.spok({ foo: { a: 1 } }, { foo: "spok.emptyObject" });
  });

  it("fails when the field is not an object", () => {
    cy.shouldFail("foo = []");
    cy.spok({ foo: [] }, { foo: "spok.emptyObject" });
  });
});

describe("spok.function", () => {
  it("passes when the field is a function", () => {
    cy.spok({ foo: () => "foo" }, { foo: "spok.function" });
  });

  it("fails when the field is not a function", () => {
    cy.shouldFail("foo = []  satisfies: spok.function");
    cy.spok({ foo: [] }, { foo: "spok.function" });
  });
});

describe("spok.ge()", () => {
  it("passes when it mathematically should do", () => {
    cy.spok({ foo: 1 }, { foo: "spok.ge(1)" });
    cy.spok({ foo: 5 }, { foo: "spok.ge(1)" });
    cy.spok({ foo: 1.1 }, { foo: "spok.ge(1.1)" });
    cy.spok({ foo: 1.5 }, { foo: "spok.ge(1.1)" });
    cy.spok({ foo: -2 }, { foo: "spok.ge(-2)" });
    cy.spok({ foo: -2 }, { foo: "spok.ge(-4)" });
  });

  it("fails when it mathematically should do", () => {
    cy.shouldFail("foo = 0  satisfies: spok.ge(1)");
    cy.spok({ foo: 0 }, { foo: "spok.ge(1)" });
  });

  it("fails when the param is not a number", () => {
    cy.shouldFail("foo = 1  satisfies: spok.ge('forty')");
    cy.spok({ foo: 1 }, { foo: "spok.ge('forty')" });
  });

  it("fails when the field is not a number", () => {
    cy.shouldFail("foo = 'a string'  satisfies: spok.ge(8)");
    cy.spok({ foo: "a string" }, { foo: "spok.ge(8)" });
  });
});

describe("spok.gez", () => {
  it("passes when it mathematically should do", () => {
    cy.spok({ foo: 0 }, { foo: "spok.gez" });
    cy.spok({ foo: 1 }, { foo: "spok.gez" });
    cy.spok({ foo: 0.1 }, { foo: "spok.gez" });
  });

  it("fails when it mathematically should do", () => {
    cy.shouldFail("foo = -1  satisfies: spok.gez");
    cy.spok({ foo: -1 }, { foo: "spok.gez" });
  });

  it("fails when the field is not a number", () => {
    cy.shouldFail("foo = 'string'  satisfies: spok.gez");
    cy.spok({ foo: "string" }, { foo: "spok.gez" });
  });
});

describe("spok.gt()", () => {
  it("passes when it mathematically should do", () => {
    cy.spok({ foo: 10 }, { foo: "spok.gt(9)" });
    cy.spok({ foo: 11.2 }, { foo: "spok.gt(11.1)" });
    cy.spok({ foo: -1 }, { foo: "spok.gt(-2)" });
  });

  it("fails when it mathematically should do", () => {
    cy.shouldFail("foo = 1  satisfies: spok.gt(1)");
    cy.spok({ foo: 1 }, { foo: "spok.gt(1)" });
  });

  it("fails when the param is not a number", () => {
    cy.shouldFail("foo = 1  satisfies: spok.gt('forty')");
    cy.spok({ foo: 1 }, { foo: "spok.gt('forty')" });
  });

  it("fails when the field is not a number", () => {
    cy.shouldFail("foo = 'a string'  satisfies: spok.gt(8)");
    cy.spok({ foo: "a string" }, { foo: "spok.gt(8)" });
  });
});

describe("spok.gtz", () => {
  it("passes when it mathematically should do", () => {
    cy.spok({ foo: 1 }, { foo: "spok.gtz" });
    cy.spok({ foo: 0.1 }, { foo: "spok.gtz" });
  });

  it("fails when it mathematically should do", () => {
    cy.shouldFail("foo = 0  satisfies: spok.gtz");
    cy.spok({ foo: 0 }, { foo: "spok.gtz" });
  });

  it("fails when the field is not a number", () => {
    cy.shouldFail("foo = 'string'  satisfies: spok.gtz");
    cy.spok({ foo: "string" }, { foo: "spok.gtz" });
  });
});

describe("spok.le()", () => {
  it("passes when it mathematically should do", () => {
    cy.spok({ foo: 1 }, { foo: "spok.le(1)" });
    cy.spok({ foo: 1 }, { foo: "spok.le(5)" });
    cy.spok({ foo: 1.1 }, { foo: "spok.le(1.1)" });
    cy.spok({ foo: 1.1 }, { foo: "spok.le(1.5)" });
    cy.spok({ foo: -2 }, { foo: "spok.le(-2)" });
    cy.spok({ foo: -4 }, { foo: "spok.le(-2)" });
  });

  it("fails when it mathematically should do", () => {
    cy.shouldFail("foo = 2  satisfies: spok.le(1)");
    cy.spok({ foo: 2 }, { foo: "spok.le(1)" });
  });

  it("fails when the param is not a number", () => {
    cy.shouldFail("foo = 1  satisfies: spok.le('forty')");
    cy.spok({ foo: 1 }, { foo: "spok.le('forty')" });
  });

  it("fails when the field is not a number", () => {
    cy.shouldFail("foo = 'a string'  satisfies: spok.le(8)");
    cy.spok({ foo: "a string" }, { foo: "spok.le(8)" });
  });
});

describe("spok.lez", () => {
  it("passes when it mathematically should do", () => {
    cy.spok({ foo: 0 }, { foo: "spok.lez" });
    cy.spok({ foo: -1 }, { foo: "spok.lez" });
    cy.spok({ foo: -0.1 }, { foo: "spok.lez" });
  });

  it("fails when it mathematically should do", () => {
    cy.shouldFail("foo = 3  satisfies: spok.lez");
    cy.spok({ foo: 3 }, { foo: "spok.lez" });
  });

  it("fails when the field is not a number", () => {
    cy.shouldFail("foo = 'string'  satisfies: spok.lez");
    cy.spok({ foo: "string" }, { foo: "spok.lez" });
  });
});

describe("spok.lt()", () => {
  it("passes when it mathematically should do", () => {
    cy.spok({ foo: 9 }, { foo: "spok.lt(10)" });
    cy.spok({ foo: 11.1 }, { foo: "spok.lt(11.2)" });
    cy.spok({ foo: -2 }, { foo: "spok.lt(-1)" });
  });

  it("fails when it mathematically should do", () => {
    cy.shouldFail("foo = 2  satisfies: spok.lt(1)");
    cy.spok({ foo: 2 }, { foo: "spok.lt(1)" });
  });

  it("fails when the param is not a number", () => {
    cy.shouldFail("foo = 1  satisfies: spok.lt('forty')");
    cy.spok({ foo: 1 }, { foo: "spok.lt('forty')" });
  });

  it("fails when the field is not a number", () => {
    cy.shouldFail("foo = 'a string'  satisfies: spok.lt(8)");
    cy.spok({ foo: "a string" }, { foo: "spok.lt(8)" });
  });
});

describe("spok.ltz", () => {
  it("passes when it mathematically should do", () => {
    cy.spok({ foo: -1 }, { foo: "spok.ltz" });
    cy.spok({ foo: -0.1 }, { foo: "spok.ltz" });
  });

  it("fails when it mathematically should do", () => {
    cy.shouldFail("foo = 3  satisfies: spok.ltz");
    cy.spok({ foo: 3 }, { foo: "spok.ltz" });
  });

  it("fails when the field is not a number", () => {
    cy.shouldFail("foo = 'string'  satisfies: spok.ltz");
    cy.spok({ foo: "string" }, { foo: "spok.ltz" });
  });
});

describe("spok.ne()", () => {
  // TODO: spok.ne() only works currently with string comparisons
  it("passes when the field does not equal the target", () => {
    cy.spok({ foo: "a string" }, { foo: "spok.ne(another string)" });
    cy.spok({}, { foo: "spok.ne(5)" });
  });

  it("fails when the field does match the target", () => {
    cy.shouldFail("foo = 'string'  satisfies: spok.ne(string)");
    cy.spok({ foo: "string" }, { foo: "spok.ne(string)" });
  });
});

describe("spok.nonEmptyArray", () => {
  it("passes when the field is a nonEmpty array", () => {
    cy.spok({ foo: mixedArray }, { foo: "spok.nonEmptyArray" });
  });

  it("fails when the field is an empty array", () => {
    cy.shouldFail("foo = []  satisfies: spok.arrayElementsRange(1, 999999999)");
    cy.spok({ foo: [] }, { foo: "spok.nonEmptyArray" });
  });

  it("fails when the field is not an array", () => {
    cy.shouldFail("foo = 1  satisfies: spok.arrayElementsRange(1, 999999999)");
    cy.spok({ foo: 1 }, { foo: "spok.nonEmptyArray" });
  });
});

describe("spok.notDefined", () => {
  it("passes when the field is undefined", () => {
    cy.spok({ foo: true }, { bar: "spok.notDefined" });
  });

  it("fails when the field is defined", () => {
    cy.shouldFail("foo = true  satisfies: spok.notDefined");
    cy.spok({ foo: true }, { foo: "spok.notDefined" });
  });
});

describe("spok.number", () => {
  it("passes when the field is a number", () => {
    cy.spok({ foo: 1 }, { foo: "spok.number" });
  });

  it("fails when the field is not a number", () => {
    cy.shouldFail("foo = '5'  satisfies: spok.number");
    cy.spok({ foo: "5" }, { foo: "spok.number" });
  });
});

describe("spok.range()", () => {
  it("passes when the field is within the range", () => {
    cy.spok({ foo: 3 }, { foo: "spok.range(2, 4)" });
    cy.spok({ foo: 3 }, { foo: "spok.range(2,4)" });
    cy.spok({ foo: 2 }, { foo: "spok.range(2,4)" });
  });

  it("fails when the field is outwith the range", () => {
    cy.shouldFail("foo = 5  satisfies: spok.range(2, 4)");
    cy.spok({ foo: 5 }, { foo: "spok.range(2, 4)" });
  });

  it("fails when the field is not a number", () => {
    cy.shouldFail("foo = '3'  satisfies: spok.range(2, 4)");
    cy.spok({ foo: "3" }, { foo: "spok.range(2, 4)" });
  });
});

describe("spok.string", () => {
  it("passes when the field is a string", () => {
    cy.spok({ foo: "a string" }, { foo: "spok.string" });
  });

  it("fails when the field is not a string", () => {
    cy.shouldFail("foo = { bar: 'string' }  satisfies: spok.string");
    cy.spok({ foo: { bar: "string" } }, { foo: "spok.string" });
  });
});

describe("spok.stringLength()", () => {
  it("passes when the field is a string of the right length", () => {
    cy.spok({ foo: "a $tr1ng" }, { foo: "spok.stringLength(8)" });
  });

  it("fails when the field is a string of the wrong length", () => {
    cy.shouldFail("foo = 'a $tr1ng'  satisfies: spok.test(/.{12}/)");
    cy.spok({ foo: "a $tr1ng" }, { foo: "spok.stringLength(12)" });
  });

  it("fails when the field is not a string", () => {
    cy.shouldFail("foo = [ 5, 2 ]  satisfies: spok.test(/.{2}/)");
    cy.spok({ foo: [5, 2] }, { foo: "spok.stringLength(2)" });
  });
});

describe("spok.test()", () => {
  it("passes when the regex matches", () => {
    cy.spok(
      { foo: "a string containing a pattern #8872" },
      { foo: "spok.test(^.*#\\d{4}$)" }
    );
  });

  it("fails when the regex doesn't match", () => {
    cy.shouldFail("foo = 'abc'  satisfies: spok.test(/^\\d{4}$/)");
    cy.spok({ foo: "abc" }, { foo: "spok.test(^\\d{4}$)" });
  });
});

describe("spok.type", () => {
  it("passes when the type matches", () => {
    cy.spok({ foo: true }, { foo: "spok.type(boolean)" });
    cy.spok({ foo: [1, 3, 4] }, { foo: "spok.type(object)" });
    cy.spok({ foo: "some string" }, { foo: "spok.type(string)" });
  });

  it("fails when the type doesn't match", () => {
    cy.shouldFail("foo = 1  satisfies: spok.type(string)");
    cy.spok({ foo: 1 }, { foo: "spok.type(string)" });
  });

  it("fails when the type provided isn't valid", () => {
    cy.shouldFail("foo = 1  satisfies: spok.type(nonsense)");
    cy.spok({ foo: 1 }, { foo: "spok.type(nonsense)" });
  });
});
