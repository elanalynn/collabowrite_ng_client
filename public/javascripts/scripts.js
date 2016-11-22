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

  console.log($stateParams.id);
  authService.isAuthorized($stateParams.id).then(function (data) {
    if (!data.data.authorized) {
      console.log('Not authorized!!');
      $location.url('/');
    }
  });

  authService.getCurrentUser().then(function (user) {
    if (!user) return null;else return user.data.id;
  }).then(function (userId) {
    Promise.all([
    // get user
    userService.getUser(userId).then(function (user) {
      vm.user = user.data;
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
}