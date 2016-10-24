function pendingService($http){

  let service = {}

  service.getPendingMyApproval = id => $http.get(`http://localhost:3000/api/v1/pending/${id}`)
  service.getPendingOtherApproval = id => $http.get(`http://localhost:3000/api/v1/pending/${id}`)
  service.setPending = data => $http.post('http://localhost:3000/api/v1/pending', data)

  return service
}
