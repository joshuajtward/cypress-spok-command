[![NPM](https://nodei.co/npm/cypress-spok-command.png?compact=true)](https://nodei.co/npm/cypress-spok-command/)

![tests](https://github.com/joshuajtward/cypress-spok-command/actions/workflows/tests.yml/badge.svg)

# cypress-spok-command

This repo is a wrapper around [cy-spok](https://www.npmjs.com/package/cy-spok), moving it into a custom command with the help of a string-to-function map. The motivation for this is to make it easier to write spok assertions in Cypress, without having to import cy-spok in every file. 

## Installation

```bash
npm i -D cypress-spok-command
# or
yarn add -D cypress-spok-command
```

## Usage

Add the following to your support file (`cypress/support/commands.js` by default):

```javascript
import 'cypress-spok-command';
```
Then inside a test you can immediately use the `cy-spok` command:

`cy.spok(target, matcher)`

e.g.

```javascript
it('matches with spok!', () => {
    cy.request('/someEndpoint').then((response) => {
        // this could also be loaded from a fixture
        const expectedResponse = {
            foo: 1
            bar: {
                a: 1,
                b: 2
            }
        } 
        cy.spok(response.body.data, expectedResponse)
    })
})
```

## Further examples

More examples can be found in the test suite for this package, under the `cypress/intergration` directory
 
