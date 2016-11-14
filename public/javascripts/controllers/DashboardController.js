function DashboardController($state, authService, userService, storyService, chapterService, favoriteService) { //pendingService
  var vm = this
  vm.chapters = []
  vm.favorites = []

  // add active class on dashboard tabs
  vm.getState = path => {
    if (path === $state.current.url) return {active: true}
  }

  authService.isAuthenticated()
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
      favoriteService.getFavoritesByUser(userId)
      .then(record => record.data.map(record => record.story_id))
      .then(storyIds => {
        storyIds.forEach(id => storyService.getStory(id).then(story => vm.favorites.push(story.data)))
      }),
      // get pending
      // pendingService.getPendingChapters(userId, 'others').then(pending => {
      //   vm.othersPending = pending
      //   console.log('others', vm.othersPending)
      // }),
      // pendingService.getPendingChapters(userId, 'mine').then(pending => {
      //   vm.myPending = pending
      //   console.log('my', vm.myPending)
      // }),
    ])
  })
}
