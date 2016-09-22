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

  var Site = {
    init: function() {
      initHourlyPay();
      initJobCards();
    }
  }

  window.Site = Site;
})(window);
