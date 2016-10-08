function config($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '../partials/home.html',
  })
  .state('login', {
    url: '/login',
    templateUrl: '../partials/login/login.html',
    controller: 'LoginController',
    controllerAs: 'vm',
  })
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: '../partials/dashboard/dashboard.html',
    controller: 'DashboardController',
    controllerAs: 'vm',
  })
  .state('stories', {
    url: '/stories',
    templateUrl: '../partials/stories/stories.html',
    controller: 'StoryController',
    controllerAs: 'vm',
  })
  .state('story/:id', {
    url: '/stories',
    templateUrl: '../partials/stories/story.html',
    controller: 'StoriesController',
    controllerAs: 'vm',
  })
  .state('stories.new', {
    url: '/new',
    templateUrl: '../partials/stories/new.html',
    controller: 'StoriesController',
    controllerAs: 'vm',
  })
  .state('stories.edit', {
    url: '/stories/:id/edit',
    templateUrl: '../partials/stories/edit.html',
    controller: 'StoriesController',
    controllerAs: 'vm',
  })
  .state('users', {
    url: '/users',
    templateUrl: '../partials/users/users.html',
    controller: 'UsersController',
    controllerAs: 'vm',
  })
}
