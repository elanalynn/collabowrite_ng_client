favoriteService.$inject = ['__env', '$http']

function favoriteService(__env, $http){

  let service = {}

  service.getFavoritesByUser = id => $http.get(`${__env.apiUrl}users/${id}/favorites`)
  service.getFavoritesByStory = id => $http.get(`${__env.apiUrl}/stories/${id}/favorites`)
  service.setFavorite = data => $http.post(`${__env.apiUrl}/favorites`, data)

  return service
}
