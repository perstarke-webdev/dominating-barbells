/*
 * Cal.com Buchung als Klick-zu-Laden Popup.
 *
 * Solange niemand auf einen Buchungs-Button klickt, wird nichts von Cal.com
 * geladen. Erst der erste Klick holt das Embed-Script nach und oeffnet das
 * Buchungsfenster ueber der Seite.
 *
 * Jeder Trigger ist ein echter Link auf cal.com. Faellt JavaScript oder das
 * Embed-Script aus, funktioniert der Link ganz normal.
 */
(function () {
  'use strict';

  var EMBED_SRC = 'https://app.cal.com/embed/embed.js';
  var CAL_ORIGIN = 'https://cal.com';
  var UI = { theme: 'dark', layout: 'month_view', hideEventTypeDetails: false };

  var state = 'idle'; // idle | loading | ready | failed

  function openFallback(href) {
    if (href) {
      window.open(href, '_blank', 'noopener');
    }
  }

  function bootstrapCal(onFail) {
    // Offizieller Cal.com Loader, nur mit eigenem onerror-Handler.
    (function (C, A, L) {
      var p = function (a, ar) { a.q.push(ar); };
      var d = C.document;
      C.Cal = C.Cal || function () {
        var cal = C.Cal;
        var ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          var s = d.createElement('script');
          s.src = A;
          s.onerror = onFail;
          d.head.appendChild(s);
          cal.loaded = true;
        }
        if (ar[0] === L) {
          var api = function () { p(api, arguments); };
          var namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ['initNamespace', namespace]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
    })(window, EMBED_SRC, 'init');

    window.Cal('init', { origin: CAL_ORIGIN });
    window.Cal('ui', UI);
  }

  function modalIsOpen() {
    // Cal.com laesst geschlossene Fenster im DOM und blendet sie per
    // "visibility: hidden" aus. Deshalb zaehlt hier nur ein sichtbares Fenster.
    var boxes = document.querySelectorAll('cal-modal-box');
    for (var i = 0; i < boxes.length; i++) {
      if (window.getComputedStyle(boxes[i]).visibility !== 'hidden') {
        return true;
      }
    }
    return false;
  }

  function openBooking(calLink, href) {
    try {
      if (state === 'idle') {
        state = 'loading';
        bootstrapCal(function () {
          state = 'failed';
          openFallback(href);
        });
      }
      if (state === 'failed') {
        openFallback(href);
        return;
      }
      window.Cal('modal', { calLink: calLink, config: UI });

      // Sicherheitsnetz: erscheint nach ein paar Sekunden kein Buchungsfenster,
      // oeffnen wir die Cal.com-Seite direkt.
      window.setTimeout(function () {
        if (state === 'failed') { return; }
        if (modalIsOpen()) { state = 'ready'; return; }
        state = 'failed';
        openFallback(href);
      }, 6000);
    } catch (err) {
      state = 'failed';
      openFallback(href);
    }
  }

  document.addEventListener('click', function (event) {
    if (event.defaultPrevented || event.button !== 0) { return; }
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) { return; }

    var target = event.target.closest ? event.target.closest('[data-booking-cal-link]') : null;
    if (!target) { return; }

    var calLink = target.getAttribute('data-booking-cal-link');
    if (!calLink) { return; }

    event.preventDefault();
    openBooking(calLink, target.getAttribute('href'));
  });
})();
