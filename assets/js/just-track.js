---
---
/*In order to access variables from _config.yml we are allowing this here,
* this so we only specigy the categories in one location.
*/

(function(window) {

  /* Google Analytics Categories */
  var companyCategory = '{{site.analytics.categories.company}}';
  var xmasCategory = '{{site.analytics.categories.xmas}}';
  var newcomerCategory = '{{site.analytics.categories.newcomer}}';
  var ctaCategory = '{{site.analytics.categories.cta}}';

  function findValueWithName(array, name) {
    var value;

    array.forEach(function(object) {
      if (object.name === name) {
        value = object.value;
      }
    });

    return value;
  }

  function trackNewcomerSignupDone() {
    if ($('.js-newcomer-register-submit-thanks').length > 0) {
      gaTrack(newcomerCategory,
                'click',
                'Wintrgarden - Finished signup');
    }
  }

  function trackNewcomerSignupStart() {
    var trackNewcomer = function(selector, eventLabel) {
      $(document).on('click', selector, function() {
        gaTrack(newcomerCategory,
                   'started',
                   eventLabel);
      });
    }

    var newcomerStart = 'Wintrgarden - Started signup';
    trackNewcomer('.js-wintrgarden-signup-no-reg', newcomerStart + ' (No reg.)');
    trackNewcomer('.js-wintrgarden-signup-reg', newcomerStart + ' (Reg.)');
  }

  function trackCompanySignup() {
    $('.js-company-signup-form').submit(function() {
      gaTrack(companyCategory, 'submit', 'Company has submitted interest for JA');
    });
  }

  function trackNewcomerGotoJobsList() {
    $('.js-goto-app-jobs').on('click', function() {
      gaTrack(
        newcomerCategory,
        'click',
        'Goto app jobs list');
    });
  }

  function trackCompanyRegPopupOpen() {
    $('.cd-popup-trigger-signin').on('click', function() {
      gaTrack(
        companyCategory,
        'click',
        'Indicate interest popup open');
    });
  }

  function trackXmasRegPopupOpen() {
    $('.cd-popup-trigger-xmas').on('click', function() {
      gaTrack(
        xmasCategory,
        'click',
        'Christmas popup open');
    });
  }

  function trackCookieAcceptClicks() {
    $(document).on('click', '.js-cookie-accept-btn', function() {
      gaTrack(
        'cookie',
        'click',
        'Cookie accept');
    });
  }

  function initTrackOfDOMElements() {
    $('[data-action]').each(function() {
      var $element = $(this);
      var category =  $element.attr('category');
      var action = $element.attr('data-action') || 'click';
      var label = $element.attr('data-action-label');

      if (!category) {
        console.error('[just-track] category can *not* be blank!');
      } else if (label) {
        // Add event listener to element
        $element.on(action, function() {
          gaTrack(
            category,
            action,
            label
          );
        });
      } else {
        console.error('[just-track] data-action-label can *not* be blank!')
      }
    });
  }

  function trackJobCardClick() {
    $(document).on('click', '.job-card', function() {
      gaTrack(ctaCategory, 'click', 'Job card on startpage clicked');
    });
  }

  var JustTrack = {
    init: function() {
      trackCookieAcceptClicks();
      trackCompanySignup();
      trackNewcomerSignupStart();
      trackNewcomerSignupDone();
      trackNewcomerGotoJobsList();
      trackXmasRegPopupOpen();
      trackCompanyRegPopupOpen();
      initTrackOfDOMElements();
      trackJobCardClick();
    }
  };

  window.JustTrack = JustTrack;
})(window);
