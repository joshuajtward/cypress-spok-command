/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    spok(target: any, matcher: any, options?: { strictMode?: boolean }): any;
  }
}
