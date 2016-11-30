'use strict';

angular.module('collabowrite', ['ui.router', 'ngAnimate', 'ngDialog']).config(config).controller('ApplicationController', ApplicationController).controller('ChapterController', ChapterController).controller('StoryController', StoryController).controller('UserController', UserController).controller('DashboardController', DashboardController).factory('pendingService', pendingService).factory('favoriteService', favoriteService).factory('chapterService', chapterService).factory('storyService', storyService).factory('userService', userService).factory('authService', authService).service('sessionService', sessionService).directive('cwProfileMenuIcon', cwProfileMenuIcon);
'use strict';

config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider'];

function config($stateProvider, $urlRouterProvider, $httpProvider) {
  //$locationProvider
  $httpProvider.defaults.withCredentials = true;
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('home', {
    url: '/',
    templateUrl: '../partials/home.html',
    controller: 'ApplicationController',
    controllerAs: 'vm'
  }).state('dashboard', {
    url: '/users/:id',
    templateUrl: '../partials/dashboard/dashboard.html',
    controller: 'DashboardController',
    controllerAs: 'vm'
  }).state('dashboard.profile', {
    url: '/profile',
    templateUrl: '../partials/dashboard/profile.html',
    controller: 'DashboardController',
    controllerAs: 'vm'
  }).state('dashboard.edit', {
    url: '/profile/edit',
    templateUrl: '../partials/dashboard/edit.html',
    controller: 'DashboardController',
    controllerAs: 'vm'
  }).state('dashboard.stories', {
    url: '/stories',
    templateUrl: '../partials/dashboard/stories.html',
    controller: 'DashboardController',
    controllerAs: 'vm'
  }).state('dashboard.chapters', {
    url: '/chapters',
    templateUrl: '../partials/dashboard/chapters.html',
    controller: 'DashboardController',
    controllerAs: 'vm'
  }).state('dashboard.favorites', {
    url: '/favorites',
    templateUrl: '../partials/dashboard/favorites.html',
    controller: 'DashboardController',
    controllerAs: 'vm'
  }).state('dashboard.pending', {
    url: '/pending',
    templateUrl: '../partials/dashboard/pending.html',
    controller: 'DashboardController',
    controllerAs: 'vm'
  }).state('stories', {
    url: '/stories',
    templateUrl: '../partials/stories/stories.html',
    controller: 'StoryController',
    controllerAs: 'vm'
  }).state('story_new', {
    url: '/stories/new',
    templateUrl: '../partials/stories/new.html',
    controller: 'StoryController',
    controllerAs: 'vm'
  }).state('story_detail', {
    url: '/stories/:id',
    templateUrl: '../partials/stories/story.html',
    controller: 'StoryController',
    controllerAs: 'vm'
  }).state('story_edit', {
    url: '/stories/:id/edit',
    templateUrl: '../partials/stories/edit.html',
    controller: 'StoryController',
    controllerAs: 'vm'
  }).state('chapter_new', {
    url: '/stories/:storyId/chapters/new',
    templateUrl: '../partials/chapters/new.html',
    controller: 'ChapterController',
    controllerAs: 'vm'
  }).state('chapter_detail', {
    url: '/stories/:storyId/chapters/:chapterId',
    templateUrl: '../partials/chapters/chapter.html',
    controller: 'ChapterController',
    controllerAs: 'vm'
  }).state('chapter_edit', {
    url: '/stories/:storyId/chapters/:chapterId/edit',
    templateUrl: '../partials/chapters/edit.html',
    controller: 'ChapterController',
    controllerAs: 'vm'
  }).state('profiles', {
    url: '/profiles',
    templateUrl: '../partials/users/profiles.html',
    controller: 'UserController',
    controllerAs: 'vm'
  }).state('profile', {
    url: '/profiles/:id',
    templateUrl: '../partials/users/profile.html',
    controller: 'UserController',
    controllerAs: 'vm'
  });
  // $locationProvider.html5Mode({
  //   enabled: true,
  //   requireBase: false,
  // })
}
'use strict';

ApplicationController.$inject = ['$stateParams', 'authService', 'userService', '$rootScope'];

function ApplicationController($stateParams, authService, userService, $rootScope) {
  var vm = this;

  vm.user = null;

  authService.getCurrentUser().then(function (data) {
    if (!data.data.user) return null;else return data.data.user.id;
  }).then(function (userId) {
    if (userId) {
      userService.getUser(userId).then(function (user) {
        vm.user = user.data;
      });
    }
  });

  vm.setCurrentUser = function (user) {
    vm.user = user;
  };
}
'use strict';

ChapterController.$inject = ['$stateParams', '$location', 'authService', 'userService', 'storyService', 'chapterService'];

function ChapterController($stateParams, $location, authService, userService, storyService, chapterService) {
  var vm = this;

  if ($stateParams.storyId) {
    storyService.getStory($stateParams.storyId).then(function (story) {
      return vm.story = story.data;
    });

    chapterService.getChaptersByStory($stateParams.storyId).then(function (chapters) {
      vm.chapters = chapters.data.data;
      vm.last_chapter = vm.chapters[vm.chapters.length - 1];
    });
  }

  if ($stateParams.chapterId) {
    chapterService.getChapter($stateParams.storyId, $stateParams.chapterId).then(function (chapter) {
      vm.chapter = chapter.data;
      userService.getUser(chapter.data.user_id).then(function (details) {
        vm.chapter.user = details.data.first_name + ' ' + details.data.last_name;
      });
    });
  }

  vm.createChapter = function (chapter) {
    var newChapter = chapter;
    authService.getCurrentUser().then(function (user) {
      newChapter.story_id = vm.story.id;
      newChapter.user_id = user.data.user.id;
      return chapterService.createChapter(newChapter).then(function (response) {
        $location.url('/stories/' + response.data.id);
      });
    });
  };
}
'use strict';

DashboardController.$inject = ['$state', '$stateParams', '$location', 'authService', 'userService', 'storyService', 'chapterService', 'favoriteService'];

function DashboardController($state, $stateParams, $location, authService, userService, storyService, chapterService, favoriteService) {
  //pendingService
  var vm = this;
  vm.chapters = [];
  vm.favorites = [];
  vm.icon = 'face';

  // add active class on dashboard tabs
  vm.getState = function (path) {
    if (path === $state.current.url) return { active: true };
  };

  if (authService.isAuthorized($stateParams.id)) {
    authService.getCurrentUser().then(function (data) {
      if (!data.data.user) return null;else return data.data.user.id;
    }).then(function (userId) {
      Promise.all([
      // get user
      userService.getUser(userId).then(function (user) {
        vm.user = user.data;
      }),
      // get user stories
      storyService.getStoriesByUser(userId).then(function (stories) {
        vm.stories = stories.data.data;
        return vm.stories.map(function (story) {
          return story.storyId;
        });
      })
      // get user story chapters
      .then(function (storyIds) {
        storyIds.map(function (id) {
          chapterService.getChaptersByStory(id).then(function (chapters) {
            chapters.data.data.forEach(function (chapter) {
              vm.chapters.push(chapter);
            });
          });
        });
      }),
      // get user favorites
      favoriteService.getFavoritesByUser(userId).then(function (record) {
        return record.data.map(function (record) {
          return record.story_id;
        });
      }).then(function (storyIds) {
        storyIds.forEach(function (id) {
          return storyService.getStory(id).then(function (story) {
            return vm.favorites.push(story.data);
          });
        });
      })]);
    });
  }

  vm.updateProfile = function (user) {
    userService.updateUser(user).then(function () {
      $state.go('dashboard.profile');
    });
  };

  vm.deactivateUser = function (id) {
    userService.deactivateUser(id).then(function () {
      $state.go('home');
    });
  };

  // vm.icons = ['face', 'art_track', 'bookmark', 'favorite', 'schedule']

  // vm.setIcon = () => {
  //   switch ($state.current.name) {
  //     case 'dashboard.profile': return vm.icons[0]
  //     case 'dashboard.stories': return vm.icons[1]
  //     case 'dashboard.chapters': return vm.icons[2]
  //     case 'dashboard.favorites': return vm.icons[3]
  //     case 'dashboard.pending': return vm.icons[4]
  //     default: return ''
  //   }
  // }
}
'use strict';

StoryController.$inject = ['$state', '$stateParams', '$location', 'authService', 'userService', 'storyService', 'chapterService', 'favoriteService', 'ngDialog'];

function StoryController($state, $stateParams, $location, authService, userService, storyService, chapterService, favoriteService, ngDialog) {

  var vm = this;
  vm.user = null;
  vm.search = '';

  authService.getCurrentUser().then(function (user) {
    vm.user = user.data.user;
    if ($stateParams.id) {
      authService.isAuthorized($stateParams.id).then(function (response) {
        vm.isAuthorized = response.data.authorized;
      });
    }
  });

  if ($state.current.name === 'stories') {
    storyService.getStories().then(function (stories) {
      vm.stories = stories.data.data;
    });
  }

  if ($state.current.name === 'story_detail') {
    storyService.getStory($stateParams.id).then(function (story) {
      vm.story = story.data;
      return vm.story;
    }).then(function (story) {
      return Promise.all([userService.getUser(story.user_id), storyService.getGenre(story.genre_id), chapterService.getChaptersByStory(story.id)]);
    }).then(function (details) {
      vm.story.user = details[0].data.first_name + ' ' + details[0].data.last_name;
      vm.story.genre = details[1].data.genre;
      vm.story.chapters = details[2].data.data;
      vm.story.last_chapter = vm.story.chapters[vm.story.chapters.length - 1];
    });

    vm.styleGenre(1);
  }

  if ($state.current.name === 'story_new') {
    vm.story = {};
    storyService.getGenres().then(function (genres) {
      vm.genres = genres.data;
      vm.story.genre_id = vm.genres[0];
    });

    vm.createStory = function (story) {
      var newStory = {
        title: story.title,
        summary: story.summary,
        cover: story.cover,
        genre_id: story.genre_id.id
      };
      authService.getCurrentUser().then(function (user) {
        return newStory.user_id = user.data.user.id;
      }).then(function () {
        return storyService.createStory(newStory);
      }).then(function (response) {
        return $location.url('/stories/' + response.data.id);
      });
    };
  }

  if ($state.current.name === 'story_edit') {
    storyService.getStory($stateParams.id).then(function (story) {
      storyService.getGenres().then(function (genres) {
        vm.story = story.data;
        vm.genres = genres.data;
        vm.story.genre_id = vm.genres[0];
      });
    });
  }

  vm.updateStory = function (id) {
    storyService.updateStory(id).then(function (id) {
      return id;
    });
  };

  vm.deleteStoryPopup = function () {
    ngDialog.open({
      template: '/partials/stories/deletePopup.html',
      controller: 'StoryController',
      controllerAs: 'vm'
    });
  };

  vm.deleteStory = function (id) {
    storyService.deleteStory(id).then(function (id) {
      return id;
    });
  };

  vm.favoriteToggle = function () {
    if (vm.favorite === true) {
      vm.favorite = false;
      favoriteService.setFavorite({
        user_id: vm.user.id,
        story_id: vm.story.id,
        boolean: false
      }).then(function () {});
    } else {
      vm.favorite = true;
      favoriteService.setFavorite({
        user_id: vm.user.id,
        story_id: vm.story.id,
        boolean: true
      }).then(function () {});
    }
  };

  vm.genreClass = function (genreId) {
    switch (genreId) {
      case 1:
        return 'lets-see-what-happens';
      case 2:
        return 'childrens';
      case 3:
        return 'comedy';
      case 4:
        return 'drama';
      case 5:
        return 'fantasy';
      case 6:
        return 'historical';
      case 7:
        return 'horror';
      case 8:
        return 'mystery';
      case 9:
        return 'romance';
      case 10:
        return 'satire';
      case 11:
        return 'scifi';
      case 12:
        return 'tragedy';
      default:
        return '';
    }
  };
}
'use strict';

UserController.$inject = ['$stateParams', '$state', '$location', 'authService', 'userService', 'storyService'];

function UserController($stateParams, $state, $location, authService, userService, storyService) {

  var vm = this;
  vm.search = '';

  authService.getCurrentUser().then(function (user) {
    return vm.user = user;
  });

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

  if ($state.current.name === 'profiles') {
    userService.getProfiles().then(function (profiles) {
      vm.profiles = profiles.data;
      vm.profiles.map(function (profile) {
        storyService.getStoriesByUser(profile.id).then(function (stories) {
          profile.stories = stories.data.data;
        });
      });
    });
  }

  if ($state.current.name === 'profile') {
    userService.getProfile($stateParams.id).then(function (profile) {
      vm.profile = profile.data;
    });
  }
}
'use strict';

function cwProfileMenuIcon() {
  return {
    restrict: 'E',
    templateUrl: '/templates/cw-profile-menu-icon.html',
    scope: '='
  };
}
'use strict';

authService.$inject = ['$http', 'sessionService'];

function authService($http, sessionService) {
  var service = {};

  service.getCurrentUser = function () {
    return $http.get('http://localhost:3000/api/v1/auth/');
  };

  service.isAuthorized = function (id) {
    return $http.get('http://localhost:3000/api/v1/auth/' + id);
  };

  return service;
}
'use strict';

chapterService.$inject = ['$http'];

function chapterService($http) {

  var service = {};

  service.getChaptersByStory = function (id) {
    return $http.get('http://localhost:3000/api/v1/stories/' + id + '/chapters');
  };
  service.getChapter = function (id) {
    return $http.get('http://localhost:3000/api/v1/chapters/' + id);
  };
  service.createChapter = function (chapter) {
    return $http.post('http://localhost:3000/api/v1/chapters', chapter);
  };

  return service;
}
'use strict';

favoriteService.$inject = ['$http'];

function favoriteService($http) {

  var service = {};

  service.getFavoritesByUser = function (id) {
    return $http.get('http://localhost:3000/api/v1/users/' + id + '/favorites');
  };
  service.getFavoritesByStory = function (id) {
    return $http.get('http://localhost:3000/api/v1/stories/' + id + '/favorites');
  };
  service.setFavorite = function (data) {
    return $http.post('http://localhost:3000/api/v1/favorites', data);
  };

  return service;
}
'use strict';

pendingService.$inject = ['$http'];

function pendingService($http) {

  var service = {};

  service.getPendingChapters = function (id, type) {
    $http.get('http://localhost:3000/api/v1/chapters/pending?id=' + id + '&type=' + type);
  };

  return service;
}
"use strict";

// sessionService.$inject = []

function sessionService() {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };

  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };
}
'use strict';

storyService.$inject = ['$http'];

function storyService($http) {

  var service = {};

  service.getStories = function () {
    return $http.get('http://localhost:3000/api/v1/stories');
  };
  service.getStory = function (id) {
    return $http.get('http://localhost:3000/api/v1/stories/' + id);
  };
  service.getGenres = function () {
    return $http.get('http://localhost:3000/api/v1/genres/');
  };
  service.getGenre = function (id) {
    return $http.get('http://localhost:3000/api/v1/genres/' + id);
  };
  service.getChapters = function (id) {
    return $http.get('http://localhost:3000/api/v1/stories/' + id + '/chapters');
  };
  service.createStory = function (story) {
    return $http.post('http://localhost:3000/api/v1/stories', story);
  };
  service.updateStory = function (story) {
    return $http.put('http://localhost:3000/api/v1/stories/' + story.id, story);
  };
  service.deleteStory = function (id) {
    return $http.delete('http://localhost:3000/api/v1/stories/' + id);
  };
  service.getStoriesByUser = function (id) {
    return $http.get('http://localhost:3000/api/v1/users/' + id + '/stories');
  };

  return service;
}
'use strict';

userService.$inject = ['$http'];

function userService($http) {

  var service = {};

  service.findOrCreate = function (user) {
    return $http.post('http://localhost:3000/api/v1/users/', user);
  };
  service.getProfiles = function () {
    return $http.get('http://localhost:3000/api/v1/users');
  };
  service.getProfile = function (id) {
    return $http.get('http://localhost:3000/api/v1/users/' + id);
  };
  service.getUser = function (id) {
    return $http.get('http://localhost:3000/api/v1/users/' + id);
  };
  service.updateUser = function (user) {
    return $http.put('http://localhost:3000/api/v1/users/' + user.id, user);
  };
  service.deactivateUser = function (id) {
    return $http.put('http://localhost:3000/api/v1/users/' + id, { is_active: false });
  };
  service.banUser = function (id) {
    return $http.put('http://localhost:3000/api/v1/users/' + id, { is_banned: true });
  };

  return service;
}