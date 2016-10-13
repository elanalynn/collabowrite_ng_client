function userService($http, $stateParams){
  let service = {}

  service.getLoggedInUser = () => $http.get('http://localhost:3000/api/v1/auth')
  service.findOrCreate = user => $http.post('http://localhost:3000/api/v1/users/', user)
  service.getUsers = () => $http.get('http://localhost:3000/api/v1/users')
  service.getUser = () => $http.get(`http://localhost:3000/api/v1/users/${$stateParams.id}`)

  return service
}
