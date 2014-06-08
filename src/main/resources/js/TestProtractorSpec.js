'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('Test Protractor', function() {

  it('should expose the correct global variables', function() {
    expect(protractor).isDefined;
    expect(browser).isDefined;
    expect(element).isDefined;
    expect(by).isDefined;
    expect(By).isDefined;
    expect($).isDefined;
  });

});
