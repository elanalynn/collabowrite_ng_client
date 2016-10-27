function pendingService($http){

  let service = {}

  service.getPendingChapters = (id, type) =>{
    console.log('eye dee', id, 'type', type)
    $http.get(`http://localhost:3000/api/v1/chapters/pending?id=${id}&type=${type}`)
  }

  return service
}
