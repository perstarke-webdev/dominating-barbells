(function (window) {
  'use strict';

  var expectedHash = 'c566b260e1d8199f49d3000c3a3525d6eceb60df7789873290c06978a8e72255';
  var fallbackCodeEncoded = 'QkItMjAyNi1FQQ==';
  var accessKey = 'dbb_signup_access_ts';
  var accessLifetimeMs = 6 * 60 * 60 * 1000;
  var encodedPaths = {
    bench_only: 'L2JiMi1hbm1lbGR1bmctYmVuY2gtb25seQ=='
  };

  function toHex(buffer) {
    return Array.from(new Uint8Array(buffer))
      .map(function (byte) {
        return byte.toString(16).padStart(2, '0');
      })
      .join('');
  }

  function supportsCrypto() {
    return Boolean(window.crypto && window.crypto.subtle && window.TextEncoder);
  }

  function getAccessTimestamp() {
    var raw = window.sessionStorage.getItem(accessKey);
    if (!raw) {
      return 0;
    }

    var parsed = parseInt(raw, 10);
    if (Number.isNaN(parsed)) {
      return 0;
    }

    return parsed;
  }

  function setAccess() {
    window.sessionStorage.setItem(accessKey, String(Date.now()));
  }

  function clearAccess() {
    window.sessionStorage.removeItem(accessKey);
  }

  function hasAccess() {
    var timestamp = getAccessTimestamp();
    if (!timestamp) {
      return false;
    }

    if (Date.now() - timestamp > accessLifetimeMs) {
      clearAccess();
      return false;
    }

    return true;
  }

  async function isValidCode(codeInput) {
    var code = (codeInput || '').trim();
    if (!code) {
      return false;
    }

    if (!supportsCrypto()) {
      return code === window.atob(fallbackCodeEncoded);
    }

    try {
      var digest = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(code));
      return toHex(digest) === expectedHash;
    } catch (error) {
      return code === window.atob(fallbackCodeEncoded);
    }
  }

  async function requestAccess() {
    if (hasAccess()) {
      return true;
    }

    var enteredCode = window.prompt('Bitte Zugangscode eingeben');
    if (enteredCode === null) {
      return false;
    }

    var valid = await isValidCode(enteredCode);
    if (!valid) {
      clearAccess();
      window.alert('Code ungültig.');
      return false;
    }

    setAccess();
    return true;
  }

  function decodePath(key) {
    var encoded = encodedPaths[key];
    if (!encoded) {
      return '';
    }

    try {
      return window.atob(encoded);
    } catch (error) {
      return '';
    }
  }

  async function navigateWithCode(targetKey) {
    var ok = await requestAccess();
    if (!ok) {
      return false;
    }

    var path = decodePath(targetKey);
    if (!path) {
      return false;
    }

    window.location.href = path;
    return true;
  }

  async function enforceAccess(fallbackPath) {
    var ok = await requestAccess();
    if (ok) {
      return true;
    }

    window.location.href = fallbackPath || '/shop/';
    return false;
  }

  function bindTriggers(selector) {
    var targets = document.querySelectorAll(selector || '.js-signup-code-trigger');
    targets.forEach(function (target) {
      target.addEventListener('click', function (event) {
        event.preventDefault();
        var targetKey = target.getAttribute('data-target-key');
        navigateWithCode(targetKey);
      });
    });
  }

  window.DBBSignupGate = {
    bindTriggers: bindTriggers,
    enforceAccess: enforceAccess,
    hasAccess: hasAccess
  };
})(window);
