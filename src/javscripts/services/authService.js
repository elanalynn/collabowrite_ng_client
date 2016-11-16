authService.$inject = ['$http']

function authService($http) {
  let service = {}

  service.isAuthenticated = () => $http.get('http://localhost:3000/api/v1/auth/')

  service.isAuthorized = id => $http.get(`http://localhost:3000/api/v1/auth/${id}`)

  return service
}
