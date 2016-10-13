function storyService($http, $stateParams){
  
  let service = {}

  service.getStories = () => $http.get('http://localhost:3000/api/v1/stories')
  service.getStory = () => $http.get(`http://localhost:3000/api/v1/stories/${$stateParams.id}`)
  service.createStory = story => $http.post('http://localhost:3000/api/v1/stories', story)

  return service
}
