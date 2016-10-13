function dashboardService($http){
  let service = {}

  service.getUserStories = function(id) {
    return $http.get(`http://localhost:3000/api/v1/users/${id}/stories`)
  }
  service.getChapters = function(id) {
    return $http.get(`http://localhost:3000/api/v1/stories/${id}/chapters`)
  }

  return service
}
