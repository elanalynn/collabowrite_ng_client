angular
  .module('collabowrite', ['ui.router', 'ngAnimate', 'ngDialog'])
  .config(config)
  .controller('ApplicationController', ApplicationController)
  .controller('ChapterController', ChapterController)
  .controller('StoryController', StoryController)
  .controller('UserController', UserController)
  .controller('DashboardController', DashboardController)
  .factory('pendingService', pendingService)
  .factory('favoriteService', favoriteService)
  .factory('chapterService', chapterService)
  .factory('storyService', storyService)
  .factory('userService', userService)
  .factory('authService', authService)
  .service('sessionService', sessionService)
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized',
  })
  .constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest',
  })
