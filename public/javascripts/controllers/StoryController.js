function StoryController($stateParams, $location, userService,  storyService) {
  const vm = this

  userService.getLoggedInUser().then(user => vm.user = user)

  storyService.getStories().then(stories => {
    vm.stories = stories.data.data
  })

  if ($stateParams.id) {
    storyService.getStory($stateParams.id)
    .then(story => {
      vm.story = story.data
      return vm.story
    })
    .then(story => Promise.all([ userService.getUser(story.user_id), storyService.getGenre(story.genre_id), storyService.getChapters(story.id)])
    )
    .then(data => {
      vm.story.user = `${data[0].data.first_name} ${data[0].data.last_name}`
      vm.story.genre = data[1].data.genre
      vm.story.chapters = data[2].data.data
      console.log(vm.story)
    })
  }

  vm.createStory = story => {
    const newStory = story
    userService.getLoggedInUser()
    .then(user => newStory.user_id = user.data.user.id)
    .then(() => storyService.createStory(newStory))
    .then(response => $location.url(`/stories/${response.data.id}`))
  }
}
