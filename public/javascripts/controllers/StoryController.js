function StoryController($stateParams, $location, userService,  storyService, chapterService, favoriteService) {
  const vm = this

  userService.getLoggedInUser().then(user => vm.user = user.data.user)

  storyService.getStories().then(stories => {
    vm.stories = stories.data.data
  })

  if ($stateParams.id) {
    storyService.getStory($stateParams.id)
    .then(story => {
      vm.story = story.data
      return vm.story
    })
    .then(story => Promise.all([
      userService.getUser(story.user_id),
      storyService.getGenre(story.genre_id),
      chapterService.getChapters(story.id),
    ]))
    .then(details => {
      vm.story.user = `${details[0].data.first_name} ${details[0].data.last_name}`
      vm.story.genre = details[1].data.genre
      vm.story.chapters = details[2].data.data
      vm.story.last_chapter = vm.story.chapters[vm.story.chapters.length - 1]
    })
  }

  vm.createStory = story => {
    const newStory = story
    userService.getLoggedInUser()
    .then(user => newStory.user_id = user.data.user.id)
    .then(() => storyService.createStory(newStory))
    .then(response => $location.url(`/stories/${response.data.id}`))
  }

  vm.favorite = false

  vm.favoriteToggle = () => {
    console.log(vm.favorite)
    if (vm.favorite === true) {
      vm.favorite = false
      favoriteService.setFavorite({user_id: vm.user.id, story_id: vm.story.id, boolean: false}).then(() => {})
    } else {
      vm.favorite = true
      favoriteService.setFavorite({user_id: vm.user.id, story_id: vm.story.id, boolean: true}).then(() => {})
    }
  }
}
