function MainController(userService) {
  const vm = this

  userService.getLoggedInUser()
  .then(user => {
    console.log('user', user.data.user)
    if (!user) vm.user = false
    else vm.user = user.data.user.displayName
    console.log('vm.user', vm.user)
  })
}
