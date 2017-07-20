const App = require('ghost-app');

var MyApp = App.extend({
  filters: {
    ghost_head: 'handleGhostHead'
  },

  handleGhostHead: function (head) {
    return head.map(function (el) {
      if (el.match(/meta name="twitter:card"/)) {
        return el.replace('content="summary_large_image"', 'content="summary"')
      }
      return el;
    });
  }
});

module.exports = MyApp
