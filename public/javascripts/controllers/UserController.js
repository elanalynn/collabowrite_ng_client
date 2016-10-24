function UserController($location, userService) {
  const vm = this

  userService.getLoggedInUser().then(user => vm.user = user)
  userService.getUsers().then(users => vm.users = users.data)

  vm.updateUser = (id, body) => {
    userService.updateUser(id, body).then(response => {
      $location.url('/')
    })
  }

  vm.deactivateUser = id => {
    userService.deactivateUser(id).then(response => {
      $location.url('/')
    })
  }

}
