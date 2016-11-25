ApplicationController.$inject = ['$stateParams', 'authService', 'userService', '$rootScope', 'AUTH_EVENTS', 'USER_ROLES']

function ApplicationController($stateParams, authService, userService, $rootScope, AUTH_EVENTS, USER_ROLES) {
  const vm = this

  vm.user = null
  vm.userRoles = USER_ROLES

  authService.getCurrentUser().then(data => {
    // $rootScope.$broadcast(AUTH_EVENTS.loginSuccess)
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
