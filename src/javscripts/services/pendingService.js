pendingService.$inject = ['$http']

function pendingService($http){

  let service = {}

  service.getPendingChapters = (id, type) => {
    $http.get(`http://localhost:3000/api/v1/chapters/pending?id=${id}&type=${type}`)
  }

  return service
}
