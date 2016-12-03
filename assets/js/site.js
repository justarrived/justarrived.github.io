(function(window) {
  function initHourlyPay() {
    // Create hourly pay input list (used for job registrations)
    window.HourlyPaysInput.createInputList({
      targetSelector: '#js-hourly-salary-input-target',
      inputTemplate: '#js-hourly-salary-input-template'
    });
  }

  function initJobCards() {
    var template = '#js-job-cards-template';
    var target = '#js-job-cards';
    window.JAJobs.createCards(target, template);
  }

  function matchHeight() {
    $('.js-match-height').matchHeight();
  }

  function UTMBuilderFormInit() {
    $('.js-utm-builder-form input').keyup(function(event) {
      utmBuilerFormSubmit();
    });
  }

  var Site = {
    init: function() {
      JustTrack.init();
      Popups.init();
      JustI18n.init();
      initHourlyPay();
      initJobCards();
      matchHeight();

      UTMBuilderFormInit();
    }
  }

  window.Site = Site;
})(window);
