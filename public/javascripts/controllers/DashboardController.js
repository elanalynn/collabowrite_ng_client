function DashboardController(userService, dashboardService) {
  var vm = this

  userService.getLoggedInUser()
  .then(user => {
    if (!user) return null
    else return user.data.user
    // console.log('vm.user', vm.user)
  }).then(user => {
    // `http://localhost:3000/api/v1/users/${id}`
    console.log(user.id)
    dashboardService.getUser(user.id)
    .then(user => {
      console.log('second user', user)
      vm.user = user.data
    })
  })



  // $http.get(`http://localhost:3000/api/v1/${id}/stories`
  // dashboardService.getUserStories = function(id) {
  //
  // }

  // `http://localhost:3000/api/v1/users/${user_id}/stories/${story_id}`
  // dashboardService.getChapters = function(user_id, story_id) {
  //
  // }
}
