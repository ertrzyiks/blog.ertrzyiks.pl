(function () {
  var els = document.querySelectorAll('[data-role="tommy-expander"]')

  els.forEach(function (el) {
    el.classList.remove('is-hidden')
    el.addEventListener('click', onClick)
  });

  function onClick(e) {
    var target = e.currentTarget;
    var wrapper = target.parentNode;
    toggle(wrapper)
  }

  function toggle(el) {
    if (el.classList.contains('is-expanded')) {
      restore(el);
    } else {
      expand(el);
    }
  }

  function expand(el) {
    el.classList.add('is-expanded');
  }

  function restore(el) {
    el.classList.remove('is-expanded');
  }
})();
