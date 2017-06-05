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

const cssUrl = '/assets/my-ghost-tommy/css/tommy.css?v=1'
const jsUrl = '/assets/my-ghost-tommy/js/tommy.js?v=1'

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
    head.push(`<link rel="preload" href="${cssUrl}" as="style">`)
    return head;
  },

  handleGhostFoot: function (foot) {
    foot.push(`<script>
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '${cssUrl}';
      link.type = 'text/css';
      var ref = document.getElementsByTagName('link')[0];
      ref.parentNode.insertBefore(link, ref);
    </script>`)
    foot.push(`<script async defer src="${jsUrl}"></script>\n`)

    return foot
  }
});

module.exports = MyApp
