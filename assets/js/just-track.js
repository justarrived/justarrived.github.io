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

  function trackNewcomerSignup() {
    var trackNewcomer = function(selector, regType) {
     $(document).on('click', selector, function() {
       analytics.track('Newcomer start Wintrgarden signup', {
         reg_type: regType,
         signup_url: location.href
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
        signup_url: location.href
      });
    });
  }

  var JustTrack = {
    init: function() {
      trackCompanySignup();
      trackNewcomerSignup();
    }
  };

  window.JustTrack = JustTrack;
})(window);
