function StoryController($stateParams, $location, userService,  storyService) {
  const vm = this

  vm.id = $stateParams.storyId
  vm.story = storyService.getStory(vm.id).then(story => vm.story = story.data)

  vm.story.user_id = userService.getLoggedInUser().then(user => {
    vm.story.user_id = user.data.user.id
  })

  vm.createStory = story => {
    storyService.createStory(story)
    .then(response => {
      const id = response.data.id
      $location.url(`/stories/${id}`)
    })
  }

  vm.createStories = () => {
    storyService.getStories().then(stories => {
      vm.stories = stories.data.data
      return vm.stories
    })
  }




}
