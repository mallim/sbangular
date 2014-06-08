'use strict';

var Page = require('astrolabe').Page;

module.exports = Page.create({
  url:	{ value: '/#login' },
  signUpUrl: { get: function () { return this.findElement( this.by.id('signup') ); } }
});
