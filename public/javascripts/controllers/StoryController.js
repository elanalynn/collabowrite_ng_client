function StoryController($stateParams, $location, userService,  storyService) {
  const vm = this
  vm.story = {}

  if ($stateParams.id) {
    storyService.getStory($stateParams.id)
    .then(story => {
      vm.story = story.data
      return vm.story
    })
    .then(story => Promise.all([userService.getUser(story.user_id), storyService.getChapters(story.id)])
      .then(data => {
        vm.story.author = `${data[0].data.first_name} ${data[0].data.last_name}`
        vm.story.chapters = data[1].data.data
        console.log(vm.story.author, vm.story.chapters)
      }))
    console.log(vm.story.author, vm.story.chapters)
  }

  storyService.getStories().then(stories => {
    vm.stories = stories.data.data
  })

  userService.getLoggedInUser().then(user => vm.user = user)

  vm.createStory = story => {
    const newStory = story
    userService.getLoggedInUser()
    .then(user => newStory.user_id = user.data.user.id)
    .then(() => storyService.createStory(newStory))
    .then(response => $location.url(`/stories/${response.data.id}`))
  }
}
