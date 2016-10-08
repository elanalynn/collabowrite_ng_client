function StoryController(storyService) {
  var vm = this
  storyService.getStories().then(stories => {
    vm.stories = stories
    console.log(vm.stories)
  })

}
