function chapterService($http){

  let service = {}

  service.getChapters = storyId => $http.get(`http://localhost:3000/api/v1/stories/${storyId}/chapters`)

  return service
}
