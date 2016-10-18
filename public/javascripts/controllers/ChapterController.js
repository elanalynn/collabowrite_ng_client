function ChapterController($stateParams, $location, userService, storyService, chapterService) {
  const vm = this

  storyService.getStory($stateParams.storyId)
  .then(story => vm.story = story.data)

  chapterService.getChapters($stateParams.storyId).then(chapters => {
    vm.chapters = chapters.data.data
    vm.last_chapter = vm.chapters[vm.chapters.length - 1]
    console.log(vm.last_chapter)
  })

  if ($stateParams.chapterId) {
    chapterService.getChapter($stateParams.chapterId)
    .then(chapter => {
      vm.chapter = chapter.data
      return vm.chapter
    })
  }

  vm.createChapter = chapter => {
    console.log(chapter)
    chapterService.createChapter(chapter)
    .then(response => {
      console.log(response)
      $location.url(`stories/${response.data.story_id}/chapters/${response.data.id}`)
    })
  }
}
