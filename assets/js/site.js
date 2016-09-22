(function(window) {
  var Site = {
    init: function() {
      // Create hourly pay input list (used for job registrations)
      window.HourlyPaysInput.createInputList({
        targetSelector: '#js-hourly-salary-input-target',
        inputTemplate: '#js-hourly-salary-input-template'
      });
    }
  }

  window.Site = Site;
})(window);
