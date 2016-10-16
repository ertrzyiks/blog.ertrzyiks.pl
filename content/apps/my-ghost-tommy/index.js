const App = require('ghost-app');

const BASE_URL = process.env.BASE_TOMMY_URL || 'http://tommy-web.ertrzyiks.me/'

function renderTommyIframe(slug) {
  return `
<div class="post-iframe_placeholder--tommy">
  <div class="post-iframe_wrapper--tommy">
    <i class="fa fa-expand is-hidden" data-role="tommy-expander"></i>
    <i class="fa fa-compress is-hidden" data-role="tommy-expander"></i>
    <iframe class="post-iframe--tommy" src="${BASE_URL}${slug}"></iframe>
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
  },
  handlePrePostRender: function (post) {
    if (post.html) {
      post.html = replaceWithTommyIframe(post.html)
    }
    return post;
  }
});

module.exports = MyApp
