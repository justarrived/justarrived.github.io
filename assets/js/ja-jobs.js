(function(window) {
  var numberOfJobs = 4;
  var path = '/jobs?include=company,category,hourly-pay'
  var pageParam = '&page' + encodeURIComponent('[') + 'size' + encodeURIComponent(']') + '=' + numberOfJobs;
  // var filterParam = '&filter' + encodeURIComponent('[') + 'hidden' + encodeURIComponent(']') + '=true';
  var filterParam = '';
  var sortParam = '&sort=-featured,filled,-job-date';

  // TODO: Uncomment
  // var baseURL = 'https://api.justarrived.se/api/v1';
  var baseURL = 'https://just-match-api-sandbox.herokuapp.com/api/v1';
  JOBS_ENDPOINT = baseURL + path + pageParam + filterParam + sortParam;

  function getJobs(callback) {
    $.getJSON(JOBS_ENDPOINT, function(response) {
      callback(response.data, response.included);
    });
  }

  function truncate(string, maxLength) {
    var result = '';
    if (string.length > maxLength) {
      result = string.substring(0, maxLength - 3) + '...';
    }

    return result;
  }

  function formatTemplate(template, name, value) {
    var regex = new RegExp(name, 'g');
    return template.replace(regex, value);
  }

  function getIncludedResource(type, id, includedData) {
    var attributes;
    includedData.forEach(function(resource) {
      if (resource.type === type && resource.id === id) {
        attributes = resource.attributes;
      }
    });
    return attributes;
  }

  function getCompanyName(includedData, id) {
    return getIncludedResource('companies', id, includedData);
  }

  function getCategoryName(includedData, id) {
    return getIncludedResource('categories', id, includedData);
  }

  function getHourlyPayValue(includedData, id) {
    return getIncludedResource('hourly-pays', id, includedData);
  }

  function relationId(type, data) {
    return data.relationships[type].data.id;
  }

  function formatJobTemplate(template, jobData, includedData) {
    var innerHTML = '';
    var jobAtrs = jobData.attributes;

    var companyId = relationId('company', jobData);
    var categoryId = relationId('category', jobData);
    var hourlyPayId = relationId('hourly-pay', jobData);

    var company = getCompanyName(includedData, companyId);
    var category = getCategoryName(includedData, categoryId);
    var hourlyPay = getHourlyPayValue(includedData, hourlyPayId);
    var rateExVAT = Math.round(hourlyPay['rate-including-vat']);

    var hours = jobAtrs.hours;
    var amount = hours * rateExVAT;
    var maxDescriptionLength = 30;
    var description = (jobAtrs['short-description'] || jobAtrs['description']);
    // description = truncate(description, maxDescriptionLength);

    innerHTML = formatTemplate(template, '%job_company%', company.name);
    innerHTML = formatTemplate(innerHTML, '%job_city%', company.city);
    innerHTML = formatTemplate(innerHTML, '%job_category%', category.name);
    innerHTML = formatTemplate(innerHTML, '%job_amount%', amount);
    innerHTML = formatTemplate(innerHTML, '%job_hours%', hours);
    innerHTML = formatTemplate(innerHTML, '%job_hourly_pay%', rateExVAT);
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
