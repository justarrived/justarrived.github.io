(function(window) {
  JA_API_URL = 'https://api.justarrived.se/api/v1';
  JOBS_ENDPOINT = JA_API_URL + '/jobs?include=company&page' + encodeURIComponent('[') + 'size' + encodeURIComponent(']') + '=3';

  function getJobs(callback) {
    $.getJSON(JOBS_ENDPOINT, function(response) {
      callback(response.data);
    });
  }

  function formatTemplate(template, name, value) {
    var regex = new RegExp(name, 'g');
    return template.replace(regex, value);
  }

  function createCards(targetSelector, templateSelector) {
    var $target = $(targetSelector);
    var $template = $(templateSelector);
    var template = $template.html().toString();
    var html = '';

    getJobs(function(jobsData) {
      jobsData.forEach(function(jobData) {
        var innerHTML = '';
        var jobAtrs = jobData.attributes;

        var company = 'Universum';
        var category = 'Containerstädare';
        var amount = '830';
        var hourlyPay= 149;
        var hours = jobAtrs.hours;
        var description = (jobAtrs['short-description'] || jobAtrs['description']).substring(0, 50);

        innerHTML = formatTemplate(template, '%job_company%', company);
        innerHTML = formatTemplate(innerHTML, '%job_category%', category);
        innerHTML = formatTemplate(innerHTML, '%job_amount%', amount);
        innerHTML = formatTemplate(innerHTML, '%job_hours%', hours);
        innerHTML = formatTemplate(innerHTML, '%job_hourly_pay%', hourlyPay);
        html += formatTemplate(innerHTML, '%job_description%', description);
      });

      $target.append(html);
    });
  }

  window.JAJobs = {
    createCards: createCards
  };
})(window);
