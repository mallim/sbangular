// A reference configuration file.
exports.config = {

  // The address of a running selenium server. If specified, Protractor will
  // connect to an already running instance of selenium. This usually looks like
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  framework: 'mocha',

  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://127.0.0.1:8080',

  // Selector for the element housing the angular app - this defaults to
  // body, but is necessary if ng-app is on a descendant of <body>
  rootElement: 'body',

  // Spec patterns are relative to this config.
  specs: [
    'e2e-browserified_tests.js'
  ]
};
