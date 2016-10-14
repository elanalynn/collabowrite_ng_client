function UserController($location, userService) {
  const vm = this

  userService.getLoggedInUser().then(user => vm.user = user)

  vm.updateUser = (id, body) => {
    userService.updateUser(id, body).then(response => {
      $location.url('/')
      console.log(response)
    })
  }

  vm.deactivateUser = id => {
    userService.deactivateUser(id).then(response => {
      $location.url('/')
      console.log(response)
    })
  }

}
