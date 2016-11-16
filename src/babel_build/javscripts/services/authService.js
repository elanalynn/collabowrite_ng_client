'use strict';

authService.$inject = ['$http'];

function authService($http) {
  var service = {};

  service.isAuthenticated = function () {
    return $http.get('http://localhost:3000/api/v1/auth/');
  };

  service.isAuthorized = function (id) {
    return $http.get('http://localhost:3000/api/v1/auth/' + id);
  };

  return service;
}