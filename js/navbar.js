(function () {
  function normalizeBasePath(basePath) {
    if (!basePath) return '';
    var trimmed = basePath.trim();
    if (!trimmed) return '';
    if (trimmed === '/') return '/';
    return trimmed.endsWith('/') ? trimmed : trimmed + '/';
  }

  function getNavbarTemplate(basePath) {
    var prefix = normalizeBasePath(basePath);
    return (
      `<nav class="navbar navbar-expand-lg navbar-dark ftco_navbar ftco-navbar-light site-navbar-target" id="ftco-navbar">
  <div class="container">
    <a class="navbar-brand" href="${prefix}index.html">
      <img src="${prefix}images/04_text_symbol_white.png" alt="IDEA LAB" class="brand-logo" loading="lazy">
    </a>
    <button class="navbar-toggler js-fh5co-nav-toggle fh5co-nav-toggle" type="button" data-toggle="collapse"
      data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="oi oi-menu"></span> <span class="menu-text">Menu</span>
    </button>

    <div class="collapse navbar-collapse" id="ftco-nav">
      <ul class="navbar-nav nav ml-auto">
        <li class="nav-item" data-nav-item="home">
          <a href="${prefix}index.html#home-section" class="nav-link"><span>Home</span></a>
        </li>
        <li class="nav-item dropdown" data-nav-item="team">
          <a class="nav-link dropdown-toggle" href="#" id="teamDropdown" role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false"><span>Team</span></a>
          <div class="dropdown-menu" aria-labelledby="teamDropdown">
            <a class="dropdown-item" href="${prefix}team-advisor.html">Advisor</a>
            <a class="dropdown-item" href="${prefix}team-researchers.html">Researchers</a>
          </div>
        </li>
        <li class="nav-item" data-nav-item="research">
          <a href="${prefix}research.html" class="nav-link"><span>Research</span></a>
        </li>
        <li class="nav-item" data-nav-item="publications">
          <a href="${prefix}publications.html" class="nav-link"><span>Publications</span></a>
        </li>
        <li class="nav-item" data-nav-item="projects">
          <a href="${prefix}projects.html" class="nav-link"><span>Projects</span></a>
        </li>
        <li class="nav-item" data-nav-item="news">
          <a href="${prefix}news.html" class="nav-link"><span>News</span></a>
        </li>
        <li class="nav-item nav-cta" data-nav-item="join">
          <a href="${prefix}join-us.html" class="nav-link nav-cta-link"><span>Join Us</span></a>
        </li>
      </ul>
    </div>
  </div>
</nav>`
    );
  }

  function renderNavbar(placeholder) {
    if (!placeholder) return;
    var basePath = placeholder.getAttribute('data-base') || placeholder.getAttribute('data-nav-root') || '';
    var template = getNavbarTemplate(basePath);
    var wrapper = document.createElement('div');
    wrapper.innerHTML = template.trim();
    var navbar = wrapper.firstElementChild;
    if (!navbar) return;

    var activeKey = placeholder.getAttribute('data-active');
    if (activeKey) {
      var activeItem = navbar.querySelector('[data-nav-item="' + activeKey + '"]');
      if (activeItem) {
        activeItem.classList.add('active');
        var activeLink = activeItem.querySelector('.nav-link');
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    }

    placeholder.replaceWith(navbar);
  }

  function initNavbar() {
    document.querySelectorAll('[data-navbar]').forEach(renderNavbar);
  }

  initNavbar();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
  }
})();
