UserController.$inject = ['$stateParams', '$state', '$location', 'authService', 'userService']

function UserController($stateParams, $state, $location, authService, userService) {

  const vm = this

  authService.getCurrentUser().then(user => vm.user = user)

  vm.updateUser = (id, body) => userService.updateUser(id, body).then(() => $location.url('/'))
  vm.deactivateUser = id => userService.deactivateUser(id).then(() => $location.url('/'))

  if ($state.current.name === 'profiles') {
    userService.getProfiles()
    .then(profiles => {
      vm.profiles = profiles.data
    })
  }

  if ($state.current.name === 'profile') {
    userService.getProfile($stateParams.id)
    .then(profile => {
      console.log(profile)
      vm.profile = profile.data
    })
  }
}
