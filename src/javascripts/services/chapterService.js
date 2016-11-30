chapterService.$inject = ['$http']

function chapterService($http){

  let service = {}

  service.getChaptersByStory = id => $http.get(`http://localhost:3000/api/v1/stories/${id}/chapters`)
  service.getChapter = id => $http.get(`http://localhost:3000/api/v1/chapters/${id}`)
  service.createChapter = chapter => $http.post(`http://localhost:3000/api/v1/chapters`, chapter)

  return service
}
