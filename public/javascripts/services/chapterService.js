function chapterService($http){

  let service = {}

  service.getChapters = id => $http.get(`http://localhost:3000/api/v1/stories/${id}/chapters`)
  service.getChapter = (storyId, chapterId) => $http.get(`http://localhost:3000/api/v1/stories/${storyId}/chapters/${chapterId}`)
  service.createChapter = chapter => $http.post(`http://localhost:3000/api/v1/stories/${chapter.story_id}/chapters`, chapter)


  return service
}
