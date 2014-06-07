'use strict';

var chai = require('chai');
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var expect = chai.expect;

var app = angular.module('AuthServiceMock', []);
require("./AuthService")(app);

describe('Test AuthService', function() {

  beforeEach(angular.mock.module("AuthServiceMock"));

  it('should have a working AuthService service', inject(['AuthService',function( AuthService) {
    expect(AuthService).isDefined;
    expect(angular.isFunction(AuthService.login)).to.be.true;
    expect(angular.isFunction(AuthService.isLoggedIn)).to.be.true;
  }]));

  it('should be able to login successfully', inject(['AuthService','$httpBackend','$rootScope', function( AuthService, $httpBackend, $rootScope ) {

    $httpBackend.whenPOST('user/authenticate', null).respond( 200, 'Done' );
    $httpBackend.whenGET('user/authenticated/retrieve').respond( {"password":null,"username":"user","authorities":[{"authority":"ROLE_USER"}],"accountNonExpired":true,"accountNonLocked":true,"credentialsNonExpired":true,"enabled":true});

    var spy = sinon.spy($rootScope, "$emit");
    var spy2 = sinon.spy($rootScope, '$broadcast');
    AuthService.login( $rootScope, "user", "user" );
    expect(spy).to.have.been.calledWith("event:loginRequest");

    $rootScope.$apply();
    $httpBackend.flush();

    expect(spy2).to.have.been.calledWith("event:loginConfirmed");
    expect($rootScope.user).not.to.be.null;
    expect(AuthService.isLoggedIn()).to.be.true;

    AuthService.logout( $rootScope ).then(function() {
      expect(spy).to.have.been.calledWith("event:logoutRequest");
      expect($rootScope.user).to.be.null;
    });

  }]));

  /**
  it("should be able to check whether user is logged in", inject(['AuthService', '$rootScope', function( AuthService, $rootScope ){
    expect($rootScope.user).not.to.be.null;
    expect(AuthService.isLoggedIn()).to.be.true;
  }]));
  **/
});
