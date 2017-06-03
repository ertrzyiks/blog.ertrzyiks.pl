const App = require('ghost-app');

var MyApp = App.extend({
  filters: {
    prePostsRender: 'handlePrePostRender'
  },
  handlePrePostRender: function (posts, locals) {
    if (!posts.length) {
      return posts
    }

    const relativeUrl = locals.relativeUrl || ''
    if (relativeUrl.match(/^\/tag\/bdd-course\//i)) {
      return posts.reverse()
    }

    return posts
  }
});

module.exports = MyApp
