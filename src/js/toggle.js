window.adminDashboard = (function () {
  var MOBILE_VIEW_THRESHOLD = 992,
      RANDOM_NAMESPACE      = 'C0F97A13-35A1-4E99-96B1-2EB54038D8F2', // chosen by fair dice roll, guaranteed to be random.
      TOGGLE_ID             = RANDOM_NAMESPACE + '.toggle',
      SIDEBAR_CLASS         = 'active',
      timeoutSet            = void 0;

  var toggleSidebar = function (showSidebar) {
    window.localStorage.setItem(TOGGLE_ID, showSidebar = showSidebar || !(window.localStorage.getItem(TOGGLE_ID) === 'true'));
    var el = document.querySelector('#page-wrapper');

    if (showSidebar) {
      if (el.classList)
        el.classList.add(SIDEBAR_CLASS);
      else
        el.className += ' ' + SIDEBAR_CLASS;
    } else {
      if (el.classList)
        el.classList.remove(SIDEBAR_CLASS);
      else
        el.className = el.className.replace(new RegExp('(^|\\b)' + SIDEBAR_CLASS.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  };

  var handleResize = function() {
    if (window.innerWidth >= MOBILE_VIEW_THRESHOLD && !!window.localStorage.getItem(TOGGLE_ID)) {
      toggleSidebar(window.localStorage.getItem(TOGGLE_ID) === 'true');
    }
    else {
      toggleSidebar(window.innerWidth >= MOBILE_VIEW_THRESHOLD);
    }

    timeoutSet = void 0;
  };

  window.addEventListener('resize', function () {
    if (!!timeoutSet) clearTimeout(timeoutSet);
    timeoutSet = setTimeout(handleResize, 200);
  });

  handleResize();

  return {
    toggleSidebar: toggleSidebar
  };
})();
