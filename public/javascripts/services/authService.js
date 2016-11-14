function authService($http) { //Session
  let service = {}

  service.isAuthenticated = () => $http.get('http://localhost:3000/api/v1/auth/')

  service.isAuthorized = () => $http.get('http://localhost:3000/api/v1/auth/')

  return service
}
