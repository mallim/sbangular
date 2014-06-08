'use strict';

var Page = require('astrolabe').Page;

module.exports = Page.create({
  url:	{ value: '/#signup' },
  cancelButton: { get: function () { return this.findElement( this.by.id('cancelButton') ); } }
});
