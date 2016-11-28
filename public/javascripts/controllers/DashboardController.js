DashboardController.$inject = ['$state', '$stateParams', '$location', 'authService', 'userService', 'storyService', 'chapterService', 'favoriteService']

function DashboardController($state, $stateParams, $location, authService, userService, storyService, chapterService, favoriteService) { //pendingService
  var vm = this
  vm.chapters = []
  vm.favorites = []

  console.log($state.current.name)

  // add active class on dashboard tabs
  vm.getState = path => {
    if (path === $state.current.url) return { active: true }
  }

  if (authService.isAuthorized($stateParams.id)) {
    authService.getCurrentUser().then(data => {
      if (!data.data.user) return null
      else return data.data.user.id
    })
    .then(userId => {
      Promise.all([
        // get user
        userService.getUser(userId).then(user => {
          vm.user = user.data
        }),
        // get user stories
        storyService.getStoriesByUser(userId)
        .then(stories => {
          vm.stories = stories.data.data
          return vm.stories.map(story => story.storyId)
        })
        // get user story chapters
        .then(storyIds => {
          storyIds.map(id => {
          chapterService.getChaptersByStory(id).then(chapters => {
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
          storyIds.forEach(id => storyService.getStory(id)
          .then(story => vm.favorites.push(story.data)))
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

  vm.updateProfile = user => {
    userService.updateUser(user)
    .then(() => {
      $state.go('dashboard.profile')
    })
  }

  vm.deactivateUser = id => {
    userService.deactivateUser(id)
    .then(() => {
      $state.go('home')
    })
  }

  vm.icons = ['face', 'art_track', 'bookmark', 'favorite', 'schedule']

  vm.setIcon = () => {
    console.log('setIcon', $state.current.name)
    switch ($state.current.name) {
      case 'dashboard.profile': return vm.icons[0]
      case 'dashboard.stories': return vm.icons[1]
      case 'dashboard.chapters': return vm.icons[2]
      case 'dashboard.favorites': return vm.icons[3]
      case 'dashboard.pending': return vm.icons[4]
      default: return ''
    }
  }
}
