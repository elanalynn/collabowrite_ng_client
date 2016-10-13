function UserController(userService) {
  const vm = this

  userService.getLoggedInUser()
  .then(user => {
    vm.user = user
    console.log(vm.user)
  })
}
