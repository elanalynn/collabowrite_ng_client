function DashboardController($state, userService, dashboardService) {
  var vm = this
  vm.chapters = []

  vm.getState = path => {
    if (path === $state.current.url) return {active: true}
  }

  userService.getLoggedInUser()
  .then(user => {
    if (!user) return null
    else return user.data.user._json
  })
  .then(user => {
    userService.getUser(user.id)
    .then(user => {
      vm.user = user.data
      return user.data.id
    })
    .then(id => {
      dashboardService.getUserStories(id)
      .then(stories => {
        vm.stories = stories.data.data
        return vm.stories.map(story => story.storyId)
      })
      .then(storyIds => {
        storyIds.map(id => {
        dashboardService.getChapters(id)
        .then(chapters => {
          chapters.data.data.forEach(chapter => {
            vm.chapters.push(chapter)
            })
          })
        })
      })
    })
  })
}
