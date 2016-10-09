function StoryController($state, $stateParams, storyService) {
  var vm = this

  // vm.goToStory = () => {
  //   $state.go('story')
  // }

  storyService.getStory().then(story => {
    console.log(story.data)
    console.log($stateParams.id)
    vm.story = story.data
    return vm.stories
  })

  storyService.getStories().then(stories => {
    vm.stories = stories.data.data
    return vm.stories
  })
}
