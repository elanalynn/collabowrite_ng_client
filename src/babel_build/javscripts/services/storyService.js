'use strict';

storyService.$inject = ['$http'];

function storyService($http) {

  var service = {};

  service.getStories = function () {
    return $http.get('http://localhost:3000/api/v1/stories');
  };
  service.getStory = function (id) {
    return $http.get('http://localhost:3000/api/v1/stories/' + id);
  };
  service.getGenre = function (id) {
    return $http.get('http://localhost:3000/api/v1/genres/' + id);
  };
  service.getChapters = function (id) {
    return $http.get('http://localhost:3000/api/v1/stories/' + id + '/chapters');
  };
  service.createStory = function (story) {
    return $http.post('http://localhost:3000/api/v1/stories', story);
  };
  service.getUserStories = function (id) {
    return $http.get('http://localhost:3000/api/v1/users/' + id + '/stories');
  };

  return service;
}