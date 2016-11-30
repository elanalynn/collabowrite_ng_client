config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider']

function config($stateProvider, $urlRouterProvider, $httpProvider) { //$locationProvider
  $httpProvider.defaults.withCredentials = true
  $urlRouterProvider.otherwise('/')
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '../partials/home.html',
    controller: 'ApplicationController',
    controllerAs: 'vm',
  })
  .state('dashboard', {
    url: '/users/:id',
    templateUrl: '../partials/dashboard/dashboard.html',
    controller: 'DashboardController',
    controllerAs: 'vm',
  })
  .state('dashboard.profile', {
    url: '/profile',
    templateUrl: '../partials/dashboard/profile.html',
    controller: 'DashboardController',
    controllerAs: 'vm',
  })
  .state('dashboard.edit', {
    url: '/profile/edit',
    templateUrl: '../partials/dashboard/edit.html',
    controller: 'DashboardController',
    controllerAs: 'vm',
  })
  .state('dashboard.stories', {
    url: '/stories',
    templateUrl: '../partials/dashboard/stories.html',
    controller: 'DashboardController',
    controllerAs: 'vm',
  })
  .state('dashboard.chapters', {
    url: '/chapters',
    templateUrl: '../partials/dashboard/chapters.html',
    controller: 'DashboardController',
    controllerAs: 'vm',
  })
  .state('dashboard.favorites', {
    url: '/favorites',
    templateUrl: '../partials/dashboard/favorites.html',
    controller: 'DashboardController',
    controllerAs: 'vm',
  })
  .state('dashboard.pending', {
    url: '/pending',
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
  .state('story_new', {
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
  .state('chapter_new', {
    url: '/stories/:storyId/chapters/new',
    templateUrl: '../partials/chapters/new.html',
    controller: 'ChapterController',
    controllerAs: 'vm',
  })
  .state('chapter_detail', {
    url: '/stories/:storyId/chapters/:chapterId',
    templateUrl: '../partials/chapters/chapter.html',
    controller: 'ChapterController',
    controllerAs: 'vm',
  })
  .state('chapter_edit', {
    url: '/stories/:storyId/chapters/:chapterId/edit',
    templateUrl: '../partials/chapters/edit.html',
    controller: 'ChapterController',
    controllerAs: 'vm',
  })
  .state('profiles', {
    url: '/profiles',
    templateUrl: '../partials/users/profiles.html',
    controller: 'UserController',
    controllerAs: 'vm',
  })
  .state('profile', {
    url: '/profiles/:id',
    templateUrl: '../partials/users/profile.html',
    controller: 'UserController',
    controllerAs: 'vm',
  })
  // $locationProvider.html5Mode({
  //   enabled: true,
  //   requireBase: false,
  // })
}
