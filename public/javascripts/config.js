function config($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '../partials/home.html',
  })
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: '../partials/dashboard/dashboard.html',
    controller: 'DashboardController',
    controllerAs: 'vm',
  })
  .state('dashboard.profile', {
    url: '/dashboard/profile',
    templateUrl: '../partials/dashboard/profile.html',
    controller: 'DashboardController',
    controllerAs: 'vm',
  })
  .state('dashboard.settings', {
    url: '/dashboard/settings',
    templateUrl: '../partials/dashboard/settings.html',
    controller: 'DashboardController',
    controllerAs: 'vm',
  })
  .state('dashboard.stories', {
    url: '/dashboard/stories',
    templateUrl: '../partials/dashboard/stories.html',
    controller: 'DashboardController',
    controllerAs: 'vm',
  })
  .state('dashboard.chapters', {
    url: '/dashboard/chapters',
    templateUrl: '../partials/dashboard/chapters.html',
    controller: 'DashboardController',
    controllerAs: 'vm',
  })
  .state('dashboard.favorites', {
    url: '/dashboard/favorites',
    templateUrl: '../partials/dashboard/favorites.html',
    controller: 'DashboardController',
    controllerAs: 'vm',
  })
  .state('dashboard.pending', {
    url: '/dashboard/pending',
    templateUrl: '../partials/dashboard/pending.html',
    controller: 'DashboardController',
    controllerAs: 'vm',
  })
  .state('stories', {
    url: '/stories',
    templateUrl: '../partials/stories/stories.html',
    controller: 'StoryController',
    controllerAs: 'vm',
  })
  .state('stories.new', {
    url: '/stories/new',
    templateUrl: '../partials/stories/new.html',
    controller: 'StoryController',
    controllerAs: 'vm',
  })
  .state('story_detail', {
    url: '/stories/:id',
    templateUrl: '../partials/stories/story.html',
    controller: 'StoryController',
    controllerAs: 'vm',
  })
  .state('story_edit', {
    url: '/stories/:id/edit',
    templateUrl: '../partials/stories/edit.html',
    controller: 'StoryController',
    controllerAs: 'vm',
  })
  .state('users', {
    url: '/users',
    templateUrl: '../partials/users/users.html',
    controller: 'UserController',
    controllerAs: 'vm',
  })
}
