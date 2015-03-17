'use strict';

angular.module('funmarket', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ngRoute', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
        .when('/new-ad/:id', {
            templateUrl: 'app/ad/new.html',
            controller: 'NewAdCtrl'
        })
        .when('/new-ad', {
            templateUrl: 'app/ad/new.html',
            controller: 'NewAdCtrl'
        })
        .when('/ads', {
            templateUrl: 'app/ad/list.html',
            controller: 'ListAdsCtrl'
        })
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
