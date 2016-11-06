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

  function createOnKeyUp(el) {
    return function (e) {
      var keyCode = e.keyCode;

      if (keyCode === 27) {
        restore(el);
      }
    }
  }

  function toggle(el) {
    if (el.classList.contains('is-expanded')) {
      restore(el);
    } else {
      expand(el);
    }
  }

  function expand(el) {
    teardownKeyUpListener(el);
    setupKeyUpListener(el);
    el.classList.add('is-expanded');
  }

  function restore(el) {
    teardownKeyUpListener(el);
    el.classList.remove('is-expanded');
  }

  function setupKeyUpListener(el) {
    var onKeyUp = createOnKeyUp(el);
    el.onKeyUpHandler = onKeyUp;
    document.addEventListener('keyup', onKeyUp);
  }

  function teardownKeyUpListener(el) {
    var onKeyUp = el.onKeyUpHandler;

    if (onKeyUp) {
      document.removeEventListener('keyup', onKeyUp);
    }

    delete el.onKeyUpHandler
  }
})();
