/*In order to access variables from _config.yml we are allowing this here,
* this so we only specigy the categories in one location.
*/
---
---

(function(window) {

  /* Google Analytics Categories */
  var registrationCategory = '{{site.analytics.categories.registration}}';
  var companyCategory = '{{site.analytics.categories.company}}';

  /**
  * Convenience function for tracking using Google Analytics
  * Since we only post events this function can be used for all tracking at this point.
  *
  @ param category    The category to post the event under
  @ param action      Action (type of click) that was performed
  @ param label       The label you want to use to describe the event
  */
  function gaTracking(category, action, label) {
    ga('send', {
      hitType: 'event',
      eventCategory: category,
      eventAction: action,
      eventLabel: label
    });
  }

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
      gaTracking(registrationCategory,
                'finished registration',
                'Newcomer finished Wintrgarden signup');
    }
  }

  function trackNewcomerSignupStart() {
    var trackNewcomer = function(selector, eventLabel) {
      $(document).on('click', selector, function() {
        gaTracking(registrationCategory,
                   'started',
                   eventLabel);
      });
    }

    var newcomerStart = 'Newcomer start Wintrgarden signup';
    trackNewcomer('.js-wintrgarden-signup-no-reg', newcomerStart + ' - No reg.');
    trackNewcomer('.js-wintrgarden-signup-reg', newcomerStart + ' - Reg.');
  }

  function trackCompanySignup() {
    $('.js-company-signup-form').submit(function() {
      gaTracking(companyCategory, 'submit', 'Company Interest Sign Up');
    });
  }

  function trackNewcomerRegPopupOpen() {
    $('.cd-popup-trigger-newcomer-signup').on('click', function() {
      gaTracking(
        registrationCategory,
        'click',
        'Newcomer reg popup open');
    });
  }

  function trackCompanyRegPopupOpen() {
    $('.cd-popup-trigger-signin').on('click', function() {
      gaTracking(
        registrationCategory,
        'click',
        'Company reg popup open');
    });
  }

  function initTrackOfDOMElements() {
    $('[data-track]').each(function() {
      var $element = $(this);
      var category =  $element.attr('category');
      var action = $element.attr('data-track') || 'click';
      var label = $element.attr('data-track-label');

      if (!category) {
        console.error('[just-track] category can *not* be blank!');
      } else if (label) {
        // Add event listener to element
        $element.on(action, function() {
          gaTracking(
            category,
            action,
            label
          );
        });
      } else {
        console.error('[just-track] data-track-label can *not* be blank!')
      }
    });
  }

  function trackJobCardClick() {
    $(document).on('click', '.job-card', function() {
      gaTracking(registrationCategory, 'click', 'Click job card from start page');
    });
  }

  var JustTrack = {
    init: function() {
      trackCompanySignup();
      trackNewcomerSignupStart();
      trackNewcomerSignupDone();
      trackNewcomerRegPopupOpen();
      trackCompanyRegPopupOpen();
      initTrackOfDOMElements();
      trackJobCardClick();
    }
  };

  window.JustTrack = JustTrack;
})(window);
