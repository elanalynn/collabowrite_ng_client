function pendingService($http){

  let service = {}

  service.getPendingMyApproval = id => $http.get(`http://localhost:3000/api/v1/chapters/pending?author=me&id=${id}`)
  service.getPendingOtherApproval = id => $http.get(`http://localhost:3000/api/v1/chapters/pending?author=notme&id=${id}`)

  return service
}
