authService.$inject = ['$http', 'sessionService']

function authService($http, sessionService) {
  let service = {}

  service.getCurrentUser = () => $http.get('http://localhost:3000/api/v1/auth/')

  service.isAuthorized = id => $http.get(`http://localhost:3000/api/v1/auth/${id}`)

  return service
}
