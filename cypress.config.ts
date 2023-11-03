import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 200,
  e2e: {
    fixturesFolder: false,
    setupNodeEvents: (on, config) => config,
  },
});
