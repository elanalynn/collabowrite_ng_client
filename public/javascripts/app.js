angular
  .module('collabowrite', ['ui.router', 'ngAnimate'])
  .config(config)
  .controller('MainController', MainController)
  .controller('StoryController', StoryController)
  .controller('UserController', UserController)
  .factory('storyService', storyService)
  .factory('userService', userService)
