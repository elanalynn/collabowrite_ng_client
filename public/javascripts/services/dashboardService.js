function dashboardService($http){
  let service = {}

  service.getUserStories = id => $http.get(`http://localhost:3000/api/v1/users/${id}/stories`)
  service.getChapters = id => $http.get(`http://localhost:3000/api/v1/stories/${id}/chapters`)

  return service
}
