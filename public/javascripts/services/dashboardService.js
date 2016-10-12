function dashboardService($http){
  let service = {}

  service.getUser = function(id) {
    return $http.get(`http://localhost:3000/api/v1/users/${id}`)
  }
  service.getUserStories = function(id) {
    return $http.get(`http://localhost:3000/api/v1/${id}/stories`)
  }
  service.getChapters = function(user_id, story_id) {
    return $http.get(`http://localhost:3000/api/v1/users/${user_id}/stories/${story_id}`)
  }

  return service
}
