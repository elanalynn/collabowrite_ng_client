function MainController(userService) {
  const vm = this

  userService.getLoggedInUser()
  .then(user => {
    console.log('get user service', user)
    if (!user.data) return null
    else return user.data.user.id
  })
  .then(userId => userService.getUser(userId).then(user => vm.user = user.data))
}
