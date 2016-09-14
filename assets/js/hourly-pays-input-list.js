(function(window) {
  JA_API_URL = 'https://api.justarrived.se/api/v1';
  HOURLY_PAYS_ENDPOINT = JA_API_URL + '/hourly-pays';

  function createInputList(options) {
    var opts = {
      targetSelector: options.targetSelector,
      inputTemplate: options.inputTemplate,
    };

    function getHourlyPays(callback) {
      $.getJSON(HOURLY_PAYS_ENDPOINT, function(response) {
        callback(response.data);
      });
    }

    var $inputListTarget = $(opts.targetSelector);
    var $inputTemplate = $(opts.inputTemplate);
    var templateHTML = $inputTemplate.html().toString();
    var inputList = [];

    getHourlyPays(function(hourlyPays) {
      for (var i = 0; i < hourlyPays.length; i++) {
        var hourlyPay = hourlyPays[i].attributes;
        var value = hourlyPay['rate-excluding-vat'];
        var inputHTML = templateHTML.replace(/%val%/g, value);
        inputList.push('<li>' + inputHTML + '</li>');
      }

      $inputListTarget.append(inputList.join(''));
    });
  }

  window.createHourlyPaysInputList = createInputList;
})(window);
