(function(window) {
  function isCurrentLocale(locale) {
    return CURRENT_LOCALE == locale;
  }

  function isAvailableLocale(locale) {
    return AVAILABLE_LOCALES.indexOf(locale) !== -1;
  }

  function getBrowserLocale() {
    return navigator.language.substring(0, 2);
  }

  function getBrowserLocales() {
    return navigator.languages.map(function(language) {
      return language.substring(0, 2)
    });
  }

  function isInBrowserLocale(locale) {
    return getBrowserLocales().indexOf(locale) !== -1;
  }

  function isPrimaryLocale(locale) {
    return locale === getBrowserLocale();
  }

  function isLocaleCookie(locale) {
    return false;
  }

  function arLocaleNudge() {
    var promptLocale = 'ar';
    if (!isCurrentLocale(promptLocale) && isInBrowserLocale(promptLocale)) {
      var $arLocale = $('.js-locale-choser .lang-ar');
      $arLocale.addClass('animated-background');
    }
  }

  function init() {
    // arLocaleNudge();
  }

  var I18n = {
    init: function() {
      init();
    }
  }

  window.JustI18n = I18n;
})(window);
