function DashboardController($state, userService, storyService, chapterService, favoriteService, pendingService) { //pendingService
  var vm = this
  vm.chapters = []

  vm.getState = path => {
    if (path === $state.current.url) return {active: true}
  }

  userService.getLoggedInUser()
  .then(user => {
    if (!user) return null
    else return user.data.user.id
  })
  .then(userId => {
    Promise.all([
      // get user
      userService.getUser(userId).then(user => vm.user = user.data),
      // get user stories
      storyService.getUserStories(userId).then(stories => {
        vm.stories = stories.data.data
        return vm.stories.map(story => story.storyId)
      })
      // get user story chapters
      .then(storyIds => {
        storyIds.map(id => {
        chapterService.getChapters(id).then(chapters => {
          chapters.data.data.forEach(chapter => {
            vm.chapters.push(chapter)
            })
          })
        })
      }),
      // get user favorites
      favoriteService.getFavoritesByUser(userId).then(favorites => vm.favorites = favorites),
      // get pending
      pendingService.getPendingMyApproval(userId).then(pending => vm.pendingMyApproval = pending),
      pendingService.getPendingOtherApproval(userId).then(pending => vm.pendingOtherApproval = pending),
    ])
    .then(data => console.log('data', data))
  })
}
