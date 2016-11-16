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