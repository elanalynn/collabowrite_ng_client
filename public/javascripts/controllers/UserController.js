function UserController($stateParams, $location, authService, userService) {
  const vm = this

  authService.isAuthenticated().then(user => vm.user = user)
  userService.getProfiles().then(profiles => vm.profiles = profiles.data)

  if ($stateParams.id) userService.getProfile($stateParams.id).then(profile => vm.profile = profile.data)

  vm.getProfile = id => userService.getProfile(id).then(profile => vm.profile = profile)
  vm.updateUser = (id, body) => userService.updateUser(id, body).then(() => $location.url('/'))
  vm.deactivateUser = id => userService.deactivateUser(id).then(() => $location.url('/'))
}
