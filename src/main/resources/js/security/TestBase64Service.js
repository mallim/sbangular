'use strict';
/*jshint expr: true*/

var base64Service = require("./Base64Service");
var Base64Service = base64Service.makeService();

var chai = require('chai');
var expect = chai.expect;

var stringToTest = "TEST_STRING";

describe('Test Base64Service', function() {

  it('Output of encode should not be null', function() {
    var output = Base64Service.encode(stringToTest);
    expect(output).not.to.be.null;
  });

  it('Output of decode should not be null', function() {
    var output = Base64Service.decode(stringToTest);
    expect(output).not.to.be.null;
  });

  it('Can decode the encoded string', function() {
    var output = Base64Service.encode(stringToTest);
    var output2 = Base64Service.decode( output );
    expect( stringToTest).to.be.equals( output2 );
  });

});


