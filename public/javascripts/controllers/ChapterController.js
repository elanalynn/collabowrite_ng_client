function ChapterController($stateParams, $location, userService, storyService, chapterService) {
  const vm = this

  console.log('$stateParams', $stateParams)

  if ($stateParams.storyId) {
    storyService.getStory($stateParams.storyId)
    .then(story => vm.story = story.data)

    chapterService.getChapters($stateParams.storyId).then(chapters => {
      vm.chapters = chapters.data.data
      vm.last_chapter = vm.chapters[vm.chapters.length - 1]
    })
  }

  if ($stateParams.chapterId) {
    chapterService.getChapter($stateParams.storyId, $stateParams.chapterId)
    .then(chapter => {
      vm.chapter = chapter.data
      userService.getUser(chapter.data.user_id)
      .then(details => {
        vm.chapter.user = `${details.data.first_name} ${details.data.last_name}`
        console.log('11', vm.chapter)
      })
    })
  }

  vm.createChapter = chapter => {
    console.log(chapter)
    const newChapter = chapter
    userService.getLoggedInUser()
    .then(user => {
      newChapter.story_id = vm.story.id
      newChapter.user_id = user.data.user.id
      return chapterService.createChapter(newChapter)
      .then(res => {
        $location.url(`stories/${newChapter.story_id}/chapters/${res.data.data[0]}`)
      })
    })
  }
}
