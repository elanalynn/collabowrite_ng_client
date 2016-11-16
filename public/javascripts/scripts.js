'use strict';

angular.module('collabowrite', ['ui.router', 'ngAnimate']).config(config).controller('ApplicationController', ApplicationController).controller('ChapterController', ChapterController).controller('StoryController', StoryController).controller('UserController', UserController).controller('DashboardController', DashboardController).factory('pendingService', pendingService).factory('favoriteService', favoriteService).factory('chapterService', chapterService).factory('storyService', storyService).factory('userService', userService).factory('authService', authService);
'use strict';

config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

function config($stateProvider, $urlRouterProvider, $httpProvider) {
  //$locationProvider
  $httpProvider.defaults.withCredentials = true;
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('home', {
    url: '/',
    templateUrl: '../partials/home.html'
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
'use strict';

ChapterController.$inject = ['$stateParams', '$location', 'authService', 'userService', 'storyService', 'chapterService'];

function ChapterController($stateParams, $location, authService, userService, storyService, chapterService) {
  var vm = this;

  if ($stateParams.storyId) {
    storyService.getStory($stateParams.storyId).then(function (story) {
      return vm.story = story.data;
    });

    chapterService.getChapters($stateParams.storyId).then(function (chapters) {
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
    authService.isAuthenticated().then(function (user) {
      newChapter.story_id = vm.story.id;
      newChapter.user_id = user.data.user.id;
      return chapterService.createChapter(newChapter).then(function (chapter) {
        $location.url('/stories/' + chapter.story_id);
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

  // add active class on dashboard tabs
  vm.getState = function (path) {
    if (path === $state.current.url) return { active: true };
  };

  authService.isAuthenticated().then(function (user) {
    if (!user) return null;else return user.data.id;
  }).then(function (userId) {
    Promise.all([
    // get user
    userService.getUser(userId).then(function (user) {
      return vm.user = user.data;
    }),
    // get user stories
    storyService.getUserStories(userId).then(function (stories) {
      vm.stories = stories.data.data;
      return vm.stories.map(function (story) {
        return story.storyId;
      });
    })
    // get user story chapters
    .then(function (storyIds) {
      storyIds.map(function (id) {
        chapterService.getChapters(id).then(function (chapters) {
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

  if ($stateParams.id) {
    authService.isAuthorized($stateParams.id).then(function (data) {
      console.log(data);
      if (!data.data.authorization) {
        console.log('Not authorized!');
        $location.url('/');
      }
    });
  }
}
'use strict';

StoryController.$inject = ['$stateParams', '$location', 'authService', 'userService', 'storyService', 'chapterService', 'favoriteService'];

function StoryController($stateParams, $location, authService, userService, storyService, chapterService, favoriteService) {
  var vm = this;

  authService.isAuthenticated().then(function (user) {
    return vm.user = user.data.user;
  });

  storyService.getStories().then(function (stories) {
    vm.stories = stories.data.data;
  });

  if ($stateParams.id) {
    storyService.getStory($stateParams.id).then(function (story) {
      vm.story = story.data;
      return vm.story;
    }).then(function (story) {
      return Promise.all([userService.getUser(story.user_id), storyService.getGenre(story.genre_id), chapterService.getChapters(story.id)]);
    }).then(function (details) {
      vm.story.user = details[0].data.first_name + ' ' + details[0].data.last_name;
      vm.story.genre = details[1].data.genre;
      vm.story.chapters = details[2].data.data;
      vm.story.last_chapter = vm.story.chapters[vm.story.chapters.length - 1];
    });
  }

  vm.createStory = function (story) {
    var newStory = story;
    authService.isAuthenticated().then(function (user) {
      return newStory.user_id = user.data.user.id;
    }).then(function () {
      return storyService.createStory(newStory);
    }).then(function (response) {
      return $location.url('/stories/' + response.data.id);
    });
  };

  vm.favorite = false;

  vm.favoriteToggle = function () {
    if (vm.favorite === true) {
      vm.favorite = false;
      favoriteService.setFavorite({ user_id: vm.user.id, story_id: vm.story.id, boolean: false }).then(function () {});
    } else {
      vm.favorite = true;
      favoriteService.setFavorite({ user_id: vm.user.id, story_id: vm.story.id, boolean: true }).then(function () {});
    }
  };
}
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
'use strict';

authService.$inject = ['$http'];

function authService($http) {
  var service = {};

  service.isAuthenticated = function () {
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

  service.getChapters = function (id) {
    return $http.get('http://localhost:3000/api/v1/stories/' + id + '/chapters');
  };
  service.getChapter = function (storyId, chapterId) {
    return $http.get('http://localhost:3000/api/v1/stories/' + storyId + '/chapters/' + chapterId);
  };
  service.createChapter = function (chapter) {
    return $http.post('http://localhost:3000/api/v1/stories/' + chapter.story_id + '/chapters', chapter);
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
  service.getGenre = function (id) {
    return $http.get('http://localhost:3000/api/v1/genres/' + id);
  };
  service.getChapters = function (id) {
    return $http.get('http://localhost:3000/api/v1/stories/' + id + '/chapters');
  };
  service.createStory = function (story) {
    return $http.post('http://localhost:3000/api/v1/stories', story);
  };
  service.getUserStories = function (id) {
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
  service.updateUser = function (id, user) {
    return $http.put('http://localhost:3000/api/v1/users/' + id, user);
  };
  service.deactivateUser = function (id) {
    return $http.put('http://localhost:3000/api/v1/users/' + id, { isActive: false });
  };
  service.banUser = function (id) {
    return $http.put('http://localhost:3000/api/v1/users/' + id, { isBanned: true });
  };

  return service;
}