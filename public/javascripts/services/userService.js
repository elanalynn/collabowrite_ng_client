userService.$inject = ['$http']

function userService($http){

  let service = {}

  service.findOrCreate = user => $http.post('http://localhost:3000/api/v1/users/', user)
  service.getProfiles = () => $http.get('http://localhost:3000/api/v1/users')
  service.getProfile = id => $http.get(`http://localhost:3000/api/v1/users/${id}`)
  service.getUser = id => $http.get(`http://localhost:3000/api/v1/users/${id}`)
  service.updateUser = user => $http.put(`http://localhost:3000/api/v1/users/${user.id}`, user)
  service.deactivateUser = id => $http.put(`http://localhost:3000/api/v1/users/${id}`, {isActive: false})
  service.banUser = id => $http.put(`http://localhost:3000/api/v1/users/${id}`, {isBanned: true})

  return service
}
