"use strict";function DashboardController(t,e,r,n,o,a,i,u){var c=this;c.chapters=[],c.favorites=[],c.getState=function(e){if(e===t.current.url)return{active:!0}},console.log(e.id),n.isAuthorized(e.id).then(function(t){t.data.authorized||(console.log("Not authorized!!"),r.url("/"))}),n.getCurrentUser().then(function(t){return t?t.data.id:null}).then(function(t){Promise.all([o.getUser(t).then(function(t){c.user=t.data}),a.getUserStories(t).then(function(t){return c.stories=t.data.data,c.stories.map(function(t){return t.storyId})}).then(function(t){t.map(function(t){i.getChapters(t).then(function(t){t.data.data.forEach(function(t){c.chapters.push(t)})})})}),u.getFavoritesByUser(t).then(function(t){return t.data.map(function(t){return t.story_id})}).then(function(t){t.forEach(function(t){return a.getStory(t).then(function(t){return c.favorites.push(t.data)})})})])})}DashboardController.$inject=["$state","$stateParams","$location","authService","userService","storyService","chapterService","favoriteService"];