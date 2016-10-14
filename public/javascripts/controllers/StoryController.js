function StoryController($stateParams, $location, userService,  storyService) {
  const vm = this

  vm.id = $stateParams.storyId
  storyService.getStory(vm.id).then(story => vm.story = story.data)
  storyService.getStories().then(stories => vm.stories = stories.data.data)
  userService.getLoggedInUser().then(user => vm.user = user)

  vm.story = {}

  vm.createStory = story => {
    userService.getLoggedInUser()
    .then(user => vm.story.user_id = user.data.user.id)
    .then(() => storyService.createStory(story)
      .then(response => {
        const id = response.data.id
        $location.url(`/stories/${id}`)
      }))
  }
}
