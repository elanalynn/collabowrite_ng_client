function ChapterController($stateParams, $location, userService, chapterService) {
  const vm = this

  chapterService.getChapters($stateParams.storyId).then(chapters => {
    console.log(chapters)
    vm.chapters = chapters.data.data
  })

  if ($stateParams.chapterId) {
    chapterService.getChapter($stateParams.chapterId)
    .then(chapter => {
      vm.chapter = chapter.data
      return vm.chapter
    })
  }

  vm.createChapter = chapter => {
    const newChapter = chapter
    userService.getLoggedInUser()
    .then(user => newChapter.user_id = user.data.user.id)
    .then(() => chapterService.createChapter(newChapter))
    .then(response => $location.url(`/chapters/${response.data.id}`))
  }
}
