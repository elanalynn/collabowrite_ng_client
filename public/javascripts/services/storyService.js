storyService.$inject = ['$http', '__env']

function storyService($http, __env){

  let service = {}

  service.getStories = () => $http.get(`${__env.apiUrl}/stories`)
  service.getStory = id => $http.get(`${__env.apiUrl}/stories/${id}`)
  service.getGenres = () => $http.get(`${__env.apiUrl}/genres/`)
  service.getGenre = id => $http.get(`${__env.apiUrl}/genres/${id}`)
  service.getChapters = id => $http.get(`${__env.apiUrl}/stories/${id}/chapters`)
  service.createStory = story => $http.post(`${__env.apiUrl}/stories`, story)
  service.updateStory = story => $http.put(`${__env.apiUrl}/stories/${story.id}`, story)
  service.deleteStory = id => $http.delete(`${__env.apiUrl}/stories/${id}`)
  service.getStoriesByUser = id => $http.get(`${__env.apiUrl}/users/${id}/stories`)

  return service
}
