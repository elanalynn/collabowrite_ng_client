pendingService.$inject = ['__env','$http']

function pendingService(__env, $http){

  let service = {}

  service.getPendingChapters = (id, type) => {
    $http.get(`${__env.apiUrl}/chapters/pending?id=${id}&type=${type}`)
  }

  return service
}
