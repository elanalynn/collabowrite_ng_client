function storyService($http){
  let service = {}
  service.getStories = function() {
    return $http.get('http://localhost:3000/api/v1/stories')
  }
  return service
}
