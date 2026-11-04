(function () {
  'use strict';

  // Count visits on the public site, excluding local previews.
  if (window.location.protocol === 'file:' ||
      /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname) ||
      window.ideaAnalyticsInitialized) return;

  window.ideaAnalyticsInitialized = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'G-6PZPSBETP1');

  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-6PZPSBETP1';
  document.head.appendChild(script);
}());
