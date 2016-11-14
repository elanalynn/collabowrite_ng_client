function MainController(authService, userService) {
  const vm = this

  authService.isAuthenticated()
  .then(data => {
    if (!data.data.user) return null
    else return data.data.user.id
  })
  .then(userId => userService.getUser(userId).then(user => vm.user = user.data))
}
