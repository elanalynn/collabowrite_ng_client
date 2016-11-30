userService.$inject = ['__env', '$http']

function userService(__env, $http){

  let service = {}

  service.findOrCreate = user => $http.post(`${__env.apiUrl}/users/`, user)
  service.getProfiles = () => $http.get(`${__env.apiUrl}/users`)
  service.getProfile = id => $http.get(`${__env.apiUrl}/users/${id}`)
  service.getUser = id => $http.get(`${__env.apiUrl}/users/${id}`)
  service.updateUser = user => $http.put(`${__env.apiUrl}/users/${user.id}`, user)
  service.deactivateUser = id => $http.put(`${__env.apiUrl}/users/${id}`, {is_active: false})
  service.banUser = id => $http.put(`${__env.apiUrl}/users/${id}`, {is_banned: true})

  return service
}
