UserController.$inject = ['$stateParams', '$state', '$location', 'authService', 'userService', 'storyService']

function UserController($stateParams, $state, $location, authService, userService, storyService) {

  const vm = this

  authService.getCurrentUser().then(user => vm.user = user)

  vm.updateUser = (id, body) => userService.updateUser(id, body).then(() => $location.url('/'))
  vm.deactivateUser = id => userService.deactivateUser(id).then(() => $location.url('/'))

  if ($state.current.name === 'profiles') {
    userService.getProfiles()
    .then(profiles => {
      vm.profiles = profiles.data
      vm.profiles.map(profile => {
        storyService.getStoriesByUser(profile.id)
        .then(stories => {
          profile.stories = stories.data.data
        })
      })
    })
  }

  if ($state.current.name === 'profile') {
    userService.getProfile($stateParams.id)
    .then(profile => {
      console.log(profile.data)
      vm.profile = profile.data
    })
  }
}
