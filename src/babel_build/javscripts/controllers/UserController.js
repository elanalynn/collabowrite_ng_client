'use strict';

UserController.$inject = ['$stateParams', '$location', 'authService', 'userService'];

function UserController($stateParams, $location, authService, userService) {
  var vm = this;

  authService.isAuthenticated().then(function (user) {
    return vm.user = user;
  });
  userService.getProfiles().then(function (profiles) {
    return vm.profiles = profiles.data;
  });

  if ($stateParams.id) userService.getProfile($stateParams.id).then(function (profile) {
    return vm.profile = profile.data;
  });

  vm.getProfile = function (id) {
    return userService.getProfile(id).then(function (profile) {
      return vm.profile = profile;
    });
  };
  vm.updateUser = function (id, body) {
    return userService.updateUser(id, body).then(function () {
      return $location.url('/');
    });
  };
  vm.deactivateUser = function (id) {
    return userService.deactivateUser(id).then(function () {
      return $location.url('/');
    });
  };
}