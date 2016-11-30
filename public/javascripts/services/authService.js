authService.$inject = ['__env', '$http', 'sessionService']

function authService(__env, $http, sessionService) {
  let service = {}

  service.getCurrentUser = () => $http.get(`${__env.apiUrl}/auth/`)

  service.isAuthorized = id => $http.get(`${__env.apiUrl}/auth/${id}`)

  return service
}
