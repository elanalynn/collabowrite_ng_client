'use strict';

ApplicationController.$inject = ['authService', 'userService'];

function ApplicationController(authService, userService) {
  var vm = this;

  authService.isAuthenticated().then(function (data) {
    if (!data.data.user) return null;else return data.data.user.id;
  }).then(function (userId) {
    return userService.getUser(userId).then(function (user) {
      return vm.user = user.data;
    });
  });
}