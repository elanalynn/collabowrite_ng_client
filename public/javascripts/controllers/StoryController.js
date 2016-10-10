function StoryController($stateParams, storyService) {
  var vm = this

  vm.id = $stateParams.id

  storyService.getStories().then(stories => {
    vm.stories = stories.data.data
    return vm.stories
  })

  storyService.getStory().then(story => {
    console.log(story)
    vm.story = story.data
    return vm.stories
  })
}
