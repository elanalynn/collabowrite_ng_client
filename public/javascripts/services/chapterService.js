chapterService.$inject = ['__env', '$http']

function chapterService(__env, $http){

  let service = {}

  service.getChaptersByStory = id => $http.get(`${__env.apiUrl}stories/${id}/chapters`)
  service.getChapter = id => $http.get(`${__env.apiUrl}/chapters/${id}`)
  service.createChapter = chapter => $http.post(`${__env.apiUrl}/chapters`, chapter)

  return service
}
