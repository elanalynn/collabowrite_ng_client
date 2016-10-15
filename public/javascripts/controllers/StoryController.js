function StoryController($stateParams, $location, userService,  storyService) {
  const vm = this

  if ($stateParams.id) {
    storyService.getStory($stateParams.id).then(story => vm.story = story.data)
  }

  storyService.getStories().then(stories => {
    vm.stories = stories.data.data
    console.log(vm.stories)
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
