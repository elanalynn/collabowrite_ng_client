function storyService($http){
  let service = {}
  service.getStories = () => {
    return $http.get('https://cw-api.herokuapp.com/api/v1')
  }
  return service
}
