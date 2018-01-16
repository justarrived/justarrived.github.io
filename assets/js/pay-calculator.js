function payCalculatorFormSubmit() {
  var $form = $('.js-pay-calculator-form');
  var $resultArea = $('#js-hourly-pay-result');

  var grossSalary = $form.find('#gross_salary').val();
  var netSalary, rateExcludingVat, rateIncludingVat;

  var resultCallback = function(attributes) {
    netSalary = attributes['net-salary'];
    rateExcludingVat = attributes['rate-excluding-vat'];
    rateIncludingVat = attributes['rate-including-vat'];

    $resultArea.find('#js-gross-salary-result').text(grossSalary);
    $resultArea.find('#js-net-salary-result').text(netSalary);
    $resultArea.find('#js-ex-vat-result').text(rateExcludingVat);
    $resultArea.find('#js-inc-vat-result').text(rateIncludingVat);
    $resultArea.show();
  };

  PayCalculator.calculate(grossSalary, resultCallback);
}

(function(window) {
  JA_API_URL = 'https://api.justarrived.se/api/v1';
  CALCULATOR_ENDPOINT = JA_API_URL + '/hourly-pays/calculate';

  var PayCalculator = {
    calculate: function(grossSalary, callback) {
      var url = CALCULATOR_ENDPOINT + '?gross_salary=' + grossSalary;
      $.getJSON(url, function(response) {
        callback(response.data.attributes);
      });
    }
  };

  window.PayCalculator = PayCalculator;
})(window);
