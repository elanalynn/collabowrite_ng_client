'use strict';

chapterService.$inject = ['$http'];

function chapterService($http) {

  var service = {};

  service.getChapters = function (id) {
    return $http.get('http://localhost:3000/api/v1/stories/' + id + '/chapters');
  };
  service.getChapter = function (storyId, chapterId) {
    return $http.get('http://localhost:3000/api/v1/stories/' + storyId + '/chapters/' + chapterId);
  };
  service.createChapter = function (chapter) {
    return $http.post('http://localhost:3000/api/v1/stories/' + chapter.story_id + '/chapters', chapter);
  };

  return service;
}