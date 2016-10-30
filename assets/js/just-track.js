(function(window) {
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
      analytics.track('Newcomer finished Wintrgarden signup', {
        locale: CURRENT_LOCALE
      });
    }
  }

  function trackNewcomerSignupStart() {
    var trackNewcomer = function(selector, regType) {
     $(document).on('click', selector, function() {
       analytics.track('Newcomer start Wintrgarden signup', {
         reg_type: regType,
         signup_url: location.href,
         locale: CURRENT_LOCALE
       });
     });
    };

    trackNewcomer('.js-wintrgarden-signup-no-reg', 'No reg.');
    trackNewcomer('.js-wintrgarden-signup-reg', 'Reg.');
  }

  function trackCompanySignup() {
    $('.js-company-signup-form').submit(function() {
      var formData = $(this).serializeArray();

      var email = findValueWithName(formData, 'email');
      var phone = findValueWithName(formData, 'phone');
      var name = findValueWithName(formData, 'last_name');
      var company = findValueWithName(formData, 'company');
      var city = findValueWithName(formData, '00N580000088gDR');

      analytics.track('Company Interest Sign Up', {
        name: name,
        email: email,
        phone: phone,
        company: company,
        city: city,
        signup_url: location.href,
        locale: CURRENT_LOCALE
      });
    });
  }

  function trackNewcomerRegPopupOpen() {
    $('.cd-popup-trigger-newcomer-signup').on('click', function() {
      analytics.track('Newcomer reg popup open', {
        locale: CURRENT_LOCALE
      });
    });
  }

  function trackCompanyRegPopupOpen() {
    $('.cd-popup-trigger-signin').on('click', function() {
      analytics.track('Company reg popup open', {
        locale: CURRENT_LOCALE
      });
    });
  }

  function initTrackOfDOMElements() {
    $('[data-track]').each(function() {
      var $element = $(this);
      var eventName = $element.attr('data-track') || 'click';
      var label = $element.attr('data-track-label');

      if (label) {
        // Add event listener to element
        $(document).on(eventName, function() {
          analytics.track(label, {
            locale: CURRENT_LOCALE
          });
        });
      } else {
        console.error('[just-track] data-track-label can *not* be blank!')
      }
    });
  }

  function trackJobCardClick() {
    $(document).on('click', '.job-card', function() {
      analytics.track('Job card click', {
        locale: CURRENT_LOCALE
      });
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
