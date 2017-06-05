(function () {
  var buttons = document.querySelectorAll('[data-role="load-exercise"]')

  buttons.forEach(function (el) {
    el.style.display = ''
    el.classList.remove('is-hidden')
    el.addEventListener('click', onClick)
  });

  function onClick(e) {
    var target = e.currentTarget;
    var wrapper = target.parentNode;
    wrapper.removeChild(target);
    wrapper.classList.add('is-expanded');
    var iframe = wrapper.querySelector('iframe');
    iframe.src = iframe.dataset.src;
  }
})();
