ApplicationController.$inject = ['$stateParams', 'authService', 'userService', '$rootScope']

function ApplicationController($stateParams, authService, userService, $rootScope) {
  const vm = this

  vm.user = null

  authService.getCurrentUser().then(data => {
    if (!data.data.user) return null
    else return data.data.user.id
  })
  .then(userId => {
    if (userId) {
      userService.getUser(userId).then(user => {
        vm.user = user.data
      })
    }
  })

  vm.setCurrentUser = user => {
    vm.user = user
  }

}
