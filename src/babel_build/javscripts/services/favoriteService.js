'use strict';

favoriteService.$inject = ['$http'];

function favoriteService($http) {

  var service = {};

  service.getFavoritesByUser = function (id) {
    return $http.get('http://localhost:3000/api/v1/users/' + id + '/favorites');
  };
  service.getFavoritesByStory = function (id) {
    return $http.get('http://localhost:3000/api/v1/stories/' + id + '/favorites');
  };
  service.setFavorite = function (data) {
    return $http.post('http://localhost:3000/api/v1/favorites', data);
  };

  return service;
}