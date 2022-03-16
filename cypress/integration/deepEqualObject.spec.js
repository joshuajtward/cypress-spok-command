/// <reference path="../../src/index.d.ts" />
import {
  errorMessageTemplate,
  strictModeErrorMessage,
} from "../support/testConstants";

const testObject = {
  foo: "some string",
  bar: { far: 1, boo: "string" },
  rah: {
    lah: {
      huzzah: true,
      tada: "#11002",
      literalah: "literal string",
    },
    wah: 100,
  },
};

describe("deep equality", () => {
  it("checks for spok deep equality in an object", () => {
    cy.spok(testObject, {
      foo: "spok.string",
      bar: { far: "spok.gtz", boo: "spok.string" },
      rah: {
        lah: {
          huzzah: "spok.boolean",
          tada: "spok.test(#\\d{5})",
          literalah: "literal string",
        },
        wah: 100,
      },
    });
  });

  it("object mismatches", () => {
    cy.on("fail", (e) =>
      expect(e.message).to.eq(
        `${errorMessageTemplate} foo = 'some string'  satisfies: spok.number`
      )
    );
    cy.spok(testObject, {
      foo: "spok.number",
    });
  });
});

describe("strictMode", () => {
  it("passes with strict mode", () => {
    cy.spok(
      testObject,
      {
        foo: "spok.string",
        bar: { far: "spok.gtz", boo: "spok.string" },
        rah: {
          lah: {
            huzzah: "spok.boolean",
            tada: "spok.test(#\\d{5})",
            literalah: "literal string",
          },
          wah: 100,
        },
      },
      { strictMode: true }
    );
  });

  it("fails when strict mode is not honoured", () => {
    cy.on("fail", (e) => expect(e.message).to.eq(strictModeErrorMessage));
    cy.spok(
      testObject,
      {
        foo: "spok.string",
      },
      { strictMode: true }
    );
  });
});
