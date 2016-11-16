'use strict';

pendingService.$inject = ['$http'];

function pendingService($http) {

  var service = {};

  service.getPendingChapters = function (id, type) {
    $http.get('http://localhost:3000/api/v1/chapters/pending?id=' + id + '&type=' + type);
  };

  return service;
}