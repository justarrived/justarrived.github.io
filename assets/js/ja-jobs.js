(function(window) {
  var numberOfJobs = 3;
  var path = '/jobs?include=company,category,hourly-pay'
  var pageParam = '&page' + encodeURIComponent('[') + 'size' + encodeURIComponent(']') + '=' + numberOfJobs;
  // var filterParam = '&filter' + encodeURIComponent('[') + 'hidden' + encodeURIComponent(']') + '=true';
  var filterParam = '';
  var sortParam = 'sort=filled';

  JA_API_URL = 'https://api.justarrived.se/api/v1';
  JOBS_ENDPOINT = JA_API_URL + path + pageParam + filterParam + sortParam;

  function getJobs(callback) {
    $.getJSON(JOBS_ENDPOINT, function(response) {
      callback(response.data, response.included);
    });
  }

  function formatTemplate(template, name, value) {
    var regex = new RegExp(name, 'g');
    return template.replace(regex, value);
  }

  function getCompanyName(includedData, id) {
    var name;
    includedData.forEach(function(resource) {
      if (resource.type === 'companies' && resource.id === id) {
        name = resource.attributes.name;
      }
    });
    return name;
  }

  function getCategoryName(includedData, id) {
    var name;
    includedData.forEach(function(resource) {
      if (resource.type === 'categories' && resource.id === id) {
        name = resource.attributes.name;
      }
    });
    return name;
  }

  function getHourlyPayValue(includedData, id) {
    var value;
    includedData.forEach(function(resource) {
      if (resource.type === 'hourly-pays' && resource.id === id) {
        value = resource.attributes['rate-excluding-vat'];
      }
    });
    return value;
  }

  function formatJobTemplate(template, jobData, includedData) {
    var innerHTML = '';
    var jobAtrs = jobData.attributes;

    var companyId = jobData.relationships.company.data.id;
    var categoryId = jobData.relationships.category.data.id;
    var hourlyPayId = jobData.relationships['hourly-pay'].data.id;

    var company = getCompanyName(includedData, companyId);
    var category = getCategoryName(includedData, categoryId);
    var hourlyPay = getHourlyPayValue(includedData, hourlyPayId);

    var hours = jobAtrs.hours;
    var amount = hours * hourlyPay;
    var maxDescriptionLength = 30;
    var description = (jobAtrs['short-description'] || jobAtrs['description']).substring(0, maxDescriptionLength);

    innerHTML = formatTemplate(template, '%job_company%', company);
    innerHTML = formatTemplate(innerHTML, '%job_category%', category);
    innerHTML = formatTemplate(innerHTML, '%job_amount%', amount);
    innerHTML = formatTemplate(innerHTML, '%job_hours%', hours);
    innerHTML = formatTemplate(innerHTML, '%job_hourly_pay%', hourlyPay);
    return formatTemplate(innerHTML, '%job_description%', description);
  }

  function createCards(targetSelector, templateSelector) {
    var $target = $(targetSelector);
    var $template = $(templateSelector);

    if ($target.length === 0 || $template.length === 0) {
      return;
    }

    var template = $template.html().toString();
    var html = '';

    getJobs(function(jobsData, includedData) {
      jobsData.forEach(function(jobData) {
        var jobId = jobData.id;
        html += formatJobTemplate(template, jobData, includedData, jobId);
      });

      $target.append(html);
    });
  }

  window.JAJobs = {
    createCards: createCards
  };
})(window);
