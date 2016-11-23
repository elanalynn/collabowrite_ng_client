storyService.$inject = ['$http']

function storyService($http){

  let service = {}

  service.getStories = () => $http.get('http://localhost:3000/api/v1/stories')
  service.getStory = id => $http.get(`http://localhost:3000/api/v1/stories/${id}`)
  service.getGenres = () => $http.get('http://localhost:3000/api/v1/genres/')
  service.getGenre = id => $http.get(`http://localhost:3000/api/v1/genres/${id}`)
  service.getChapters = id => $http.get(`http://localhost:3000/api/v1/stories/${id}/chapters`)
  service.createStory = story => $http.post('http://localhost:3000/api/v1/stories', story)
  service.getStoriesByUser = id => $http.get(`http://localhost:3000/api/v1/users/${id}/stories`)

  return service
}
