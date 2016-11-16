'use strict';

userService.$inject = ['$http'];

function userService($http) {

  var service = {};

  service.findOrCreate = function (user) {
    return $http.post('http://localhost:3000/api/v1/users/', user);
  };
  service.getProfiles = function () {
    return $http.get('http://localhost:3000/api/v1/users');
  };
  service.getProfile = function (id) {
    return $http.get('http://localhost:3000/api/v1/users/' + id);
  };
  service.getUser = function (id) {
    return $http.get('http://localhost:3000/api/v1/users/' + id);
  };
  service.updateUser = function (id, user) {
    return $http.put('http://localhost:3000/api/v1/users/' + id, user);
  };
  service.deactivateUser = function (id) {
    return $http.put('http://localhost:3000/api/v1/users/' + id, { isActive: false });
  };
  service.banUser = function (id) {
    return $http.put('http://localhost:3000/api/v1/users/' + id, { isBanned: true });
  };

  return service;
}