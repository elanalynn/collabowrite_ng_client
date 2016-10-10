function userService($http, $stateParams){
  let service = {}

  service.getUsers = function() {
    return $http.get('http://localhost:3000/api/v1/users')
  }
  service.getUser = function() {
    return $http.get(`http://localhost:3000/api/v1/users/${$stateParams.id}`)
  }

  return service
}
