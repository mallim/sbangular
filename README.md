sbangular 
=========

> Run e2e angular tests with webdriver.

[![Build Status](https://travis-ci.org/mallim/sbangular.svg?branch=master)](https://travis-ci.org/mallim/sbangular)
[![Dependencies](https://david-dm.org/mallim/sbangular.png)](https://david-dm.org/mallim/sbangular)
[![devDependencies](https://david-dm.org/mallim/sbangular/dev-status.png)](https://david-dm.org/mallim/sbangular#info=devDependencies&view=table)

## Libraries Demonstrated

`sbangular` comes with many of popular, battle-tested modern web frameworks and libraries. All these parts are already wired together for you using best practices! :) Don't waste time writing boilerplate code.

  * [Angular](http://angularjs.org/)
  * [Bootstrap](http://getbootstrap.com/)
  * [Bootswatch](http://bootswatch.com/)
  * [Bower](http://bower.io/)
  * [Browserify](https://github.com/substack/node-browserify)
  * [Grunt](http://gruntjs.com/)
  * [jQuery](http://jquery.com/)
  * [JSHint](http://www.jshint.com/)
  * [LESS](http://lesscss.org/) w/ [LESS Hat](http://lesshat.com/)  
  * [Mocha](http://visionmedia.github.io/mocha/) w/ [Chai](http://chaijs.com/)
  * [Protractor](https://github.com/angular/protractor)
  * [Spring Boot](http://projects.spring.io/spring-boot/)
  * [Spring Security](http://projects.spring.io/spring-security/)
  
## How to Use  
  
### Development

  [Grunt](http://gruntjs.com/) tasks to build your app:

    $ grunt mockup              # with reloading to do mockup
    $ grunt test                # to perform the mocha tests
        
### Testing

#### End-to-End (E2E) Testing with [Protractor](https://github.com/angular/protractor)

  Protractor wraps around [WebDriverJS](https://code.google.com/p/selenium/wiki/WebDriverJs), which is a javascript binding for Selenium-Webdriver.

  > Selenium-Webdriver is a browser automation framework. Tests are written with the WebDriver API, which communicates with a Selenium server to control the browser under test. - [Protractor Getting Started Guide](https://github.com/angular/protractor/blob/master/docs/getting-started.md)

  Therefore, you need to first download and install Selenium standalone server. If you successfully performed `npm install`, you will have `./node_modules/.bin/webdriver-manager`. You can download and install Selenium standalone server by the following command:

    $ ./node_modules/.bin/webdriver-manager update

  From then on, you can start the server via:

    $ ./node_modules/.bin/webdriver-manager start
            
  You need to have the Selenium server running before running E2E tests. Once the Selenium server is running, you should also start the application server (in another tab) because your tests will run against it:
     
    $ gradle bootRun
    
  While the application server is running, open another tab and run e2e tests using Protractor.
  
    $ grunt e2e
    
## Contributing to the Project

  All [pull requests](https://help.github.com/articles/using-pull-requests) are welcome.


## License

And of course:

MIT: http://mallim.mit-license.org
