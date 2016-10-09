function storyService($http, $stateParams){
  let service = {}

  service.getStories = function() {
    return $http.get('http://localhost:3000/api/v1/stories')
  }
  service.getStory = function() {
    return $http.get(`http://localhost:3000/api/v1/stories/${$stateParams.id}`)
  }

  return service
}
