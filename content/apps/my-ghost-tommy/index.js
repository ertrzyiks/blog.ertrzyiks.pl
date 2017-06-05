const App = require('ghost-app');

const BASE_URL = process.env.BASE_TOMMY_URL || 'http://tommy-web.ertrzyiks.me/'

function renderTommyIframe(slug) {
  return `
<div class="post-iframe_placeholder--tommy">
  <div class="post-iframe_wrapper--tommy">
    <button class="post-iframe_button--tommy is-hidden" style="display: none" data-role="load-exercise">Load the exercise</button>
    <iframe class="post-iframe--tommy" data-src="${BASE_URL}${slug}" style="width: 100%; height: 600px"></iframe>
  </div>
</div>
`
}

function replaceWithTommyIframe(html) {
  return html.replace(/<!--TOMMY (.+?) YMMOT-->/g, function (match, slug) {
    return renderTommyIframe(slug)
  })
}

var MyApp = App.extend({
  filters: {
    prePostsRender: 'handlePrePostRender',
    ghost_foot: 'handleGhostFoot',
  },
  handlePrePostRender: function (post) {
    if (post.html) {
      post.html = replaceWithTommyIframe(post.html)
    }
    return post;
  },

  handleGhostFoot: function (foot) {
    const cssUrl = '/assets/my-ghost-tommy/css/tommy.css?v=1'
    foot.push(`<link rel="stylesheet" type="text/css" href="${cssUrl}">\n`)

    const jsUrl = '/assets/my-ghost-tommy/js/tommy.js?v=1'
    foot.push(`<script src="${jsUrl}"></script>\n`)

    return foot
  }
});

module.exports = MyApp
