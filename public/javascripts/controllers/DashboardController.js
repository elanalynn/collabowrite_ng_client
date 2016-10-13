function DashboardController(userService, dashboardService) {
  var vm = this
  userService.getLoggedInUser()
  .then(user => {
    if (!user) return null
    else {
      // console.log('getLoggedInUser', user.data.user._json)
      return user.data.user._json
    }
  })
  .then(user => {
    userService.findOrCreate(user)
    .then(user => {
      console.log('findOrCreate', user)
      vm.user = user.data
      console.log('vm.user', vm.user)
      return user.data.id
    })
    .then(id => {
      dashboardService.getUserStories(id)
      .then(stories => {
        vm.stories = stories.data
        return vm.stories.map(story => story.id)
      })
      .then(storyIds => {
        storyIds.map(id => dashboardService.getChapters(id)
        .then(chapters => {
          vm.chapters = {id: chapters.data}
        }))
      })
    })
  })
}
