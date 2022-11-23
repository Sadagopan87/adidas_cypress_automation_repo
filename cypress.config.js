const { defineConfig } = require("cypress");
module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 20000,
    setupNodeEvents(on, config) {
      reporter: 'cypress/reporter/result.js'
      require('cypress-mochawesome-reporter/plugin')(on);
      
    },
  },
});


