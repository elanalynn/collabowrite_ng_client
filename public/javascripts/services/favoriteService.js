function favoriteService($http){

  let service = {}

  service.getUserFavorites = id => $http.get(`http://localhost:3000/api/v1/favorites/${id}`)
  service.setFavorite = data => $http.post('http://localhost:3000/api/v1/favorites', data)

  return service
}
