function MainController(userService) {
  const vm = this

  userService.getLoggedInUser()
  .then(user => {
    if (!user) return null
    else return user.data.user._json
  })
  .then(user => {
    userService.findOrCreate(user)
    .then(user => vm.user = user.data)
  })
}
