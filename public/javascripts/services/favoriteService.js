function favoriteService($http){

  let service = {}

  service.getFavoritesByUser = id => $http.get(`http://localhost:3000/api/v1/users/${id}/favorites`)
  service.getFavoritesByStory = id => $http.get(`http://localhost:3000/api/v1/stories/${id}/favorites`)
  service.setFavorite = data => $http.post('http://localhost:3000/api/v1/favorites', data)

  return service
}
