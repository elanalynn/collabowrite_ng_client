function StoryController(storyService) {
  var vm = this
  storyService.getStories().then(stories => {
    console.log(stories.data.data)
    vm.stories = stories.data.data
    return vm.stories
  })

}
