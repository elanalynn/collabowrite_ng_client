var env = {}

if(window) Object.assign(env, window.__env)

angular
  .module('collabowrite', ['ui.router', 'ngAnimate', 'ngDialog'])
  .config(config)
  .constant('__env', env)
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
  .directive('cwProfileMenuIcon', cwProfileMenuIcon)
