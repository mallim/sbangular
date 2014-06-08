'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('Test Signup Spec |', function() {

  var form = null;
  var LoginPage = require('../login/LoginPage');
  var SignupPage = require("./SignupPage");

  it('/ should goto /login', function() {
    browser.get("http://localhost:8080");
    browser.wait(function() {
      return browser.getCurrentUrl().then(function(url) {
        LoginPage.go();
        return /login/.test(url);
      });
    });
  });

  it('click Sign Up should goto /signup', function() {
    expect(LoginPage.signUpUrl).isDefined;
    LoginPage.signUpUrl.click();
    browser.wait(function() {
      return browser.getCurrentUrl().then(function(url) {
        SignupPage.go();
        return /signup/.test(url);
      });
    });
  });

  it('click Cancel should goto /login', function() {
    form = browser.findElement(by.css("form[name=signupForm]"));
    expect(form).isDefined;
    expect(SignupPage.cancelButton).isDefined;
    SignupPage.cancelButton.click();
    browser.wait(function() {
      return browser.getCurrentUrl().then(function(url) {
        LoginPage.go();
        return /login/.test(url);
      });
    });
  });

  it('click Sign Up should goto /signup again', function() {
    LoginPage.signUpUrl.click();
    browser.wait(function() {
      return browser.getCurrentUrl().then(function(url) {
        SignupPage.go();
        return /signup/.test(url);
      });
    });
  });

});

