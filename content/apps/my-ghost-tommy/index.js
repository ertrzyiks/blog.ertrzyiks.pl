const App = require('ghost-app');

const BASE_URL = process.env.BASE_TOMMY_URL || 'http://tommy-web.ertrzyiks.me/'

function renderTommyIframe(slug) {
  return `
<div class="post-iframe_placeholder--tommy">
  <div class="post-iframe_wrapper--tommy">
    <button class="post-iframe_button--tommy is-hidden" data-role="load-exercise">Load the exercise</button>
    <iframe class="post-iframe--tommy" data-src="${BASE_URL}${slug}"></iframe>
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
    ghost_head: 'handleGhostHead',
    ghost_foot: 'handleGhostFoot',
  },
  handlePrePostRender: function (post) {
    if (post.html) {
      post.html = replaceWithTommyIframe(post.html)
    }
    return post;
  },

  handleGhostHead: function (head) {
    const assetUrl = '/assets/my-ghost-tommy/css/tommy.css?v=1'
    head.push(`<link rel="stylesheet" type="text/css" href="${assetUrl}">\n`)
    return head
  },

  handleGhostFoot: function (foot) {
    const assetUrl = '/assets/my-ghost-tommy/js/tommy.js?v=1'
    foot.push(`<script src="${assetUrl}"></script>\n`)

    return foot
  }
});

module.exports = MyApp
