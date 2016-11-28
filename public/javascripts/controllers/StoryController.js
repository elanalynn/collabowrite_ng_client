StoryController.$inject = [ '$state','$stateParams', '$location', 'authService', 'userService', 'storyService', 'chapterService', 'favoriteService', 'ngDialog']

function StoryController($state, $stateParams, $location, authService, userService,  storyService, chapterService, favoriteService, ngDialog) {

  const vm = this
  vm.user = null
  vm.search = ''

  authService.getCurrentUser().then(user => {
    vm.user = user.data.user
    if ($stateParams.id) {
      authService.isAuthorized($stateParams.id)
      .then(response => {
        vm.isAuthorized = response.data.authorized
      })
    }
  })

  if ($state.current.name === 'stories') {
    storyService.getStories().then(stories => {
      vm.stories = stories.data.data
    })
  }

  if ($state.current.name === 'story_detail') {
    storyService.getStory($stateParams.id)
    .then(story => {
      vm.story = story.data
      return vm.story
    })
    .then(story => Promise.all([
      userService.getUser(story.user_id),
      storyService.getGenre(story.genre_id),
      chapterService.getChaptersByStory(story.id),
    ]))
    .then(details => {
      vm.story.user = `${details[0].data.first_name} ${details[0].data.last_name}`
      vm.story.genre = details[1].data.genre
      vm.story.chapters = details[2].data.data
      vm.story.last_chapter = vm.story.chapters[vm.story.chapters.length - 1]
    })

    vm.styleGenre(1)
  }

  if ($state.current.name === 'story_new') {
    vm.story = {}
    storyService.getGenres()
    .then(genres => {
      vm.genres = genres.data
      vm.story.genre_id = vm.genres[0]
    })

    vm.createStory = story => {
      const newStory = {
        title: story.title,
        summary: story.summary,
        cover: story.cover,
        genre_id: story.genre_id.id,
      }
      authService.getCurrentUser()
      .then(user => newStory.user_id = user.data.user.id)
      .then(() => storyService.createStory(newStory))
      .then(response => $location.url(`/stories/${response.data.id}`))
    }
  }

  if ($state.current.name === 'story_edit') {
    storyService.getStory($stateParams.id)
    .then(story => {
      storyService.getGenres()
      .then(genres => {
        vm.story = story.data
        vm.genres = genres.data
        vm.story.genre_id = vm.genres[0]
      })
    })
  }

  vm.updateStory = id => {
    storyService.updateStory(id)
    .then(id => id)
  }

  vm.deleteStoryPopup = () => {
    ngDialog.open({
      template: '/partials/stories/deletePopup.html',
      controller: 'StoryController',
      controllerAs: 'vm',
    })
  }

  vm.deleteStory = id => {
    storyService.deleteStory(id)
    .then(id => id)
  }

  vm.favoriteToggle = () => {
    if (vm.favorite === true) {
      vm.favorite = false
      favoriteService.setFavorite({
        user_id: vm.user.id,
        story_id: vm.story.id,
        boolean: false,
      })
      .then(() => {})
    } else {
      vm.favorite = true
      favoriteService.setFavorite({
        user_id: vm.user.id,
        story_id: vm.story.id,
        boolean: true,
      })
      .then(() => {})
    }
  }

  vm.genreClass = genreId => {
    switch (genreId) {
      case 1: return 'lets-see-what-happens'
      case 2: return 'childrens'
      case 3: return 'comedy'
      case 4: return 'drama'
      case 5: return 'fantasy'
      case 6: return 'historical'
      case 7: return 'horror'
      case 8: return 'mystery'
      case 9: return 'romance'
      case 10: return 'satire'
      case 11: return 'scifi'
      case 12: return 'tragedy'
      default: return ''
    }
  }
}
