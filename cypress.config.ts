import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 200,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
