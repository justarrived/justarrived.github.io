(function(window) {
  var numberOfJobs = 4;
  var path = '/jobs?include=company,category,hourly-pay'
  var pageParam = '&page' + encodeURIComponent('[') + 'size' + encodeURIComponent(']') + '=' + numberOfJobs;
  // var filterParam = '&filter' + encodeURIComponent('[') + 'hidden' + encodeURIComponent(']') + '=true';
  var filterParam = '';
  var sortParam = '&sort=-featured,filled,-job-date';

  var baseURL = 'https://api.justarrived.se/api/v1';
  // var baseURL = 'https://just-match-api-staging.herokuapp.com/api/v1';
  JOBS_ENDPOINT = baseURL + path + pageParam + filterParam + sortParam;

  function getJobs(callback) {
  $.ajax({
      url: JOBS_ENDPOINT,
      type: 'GET',
      dataType: 'json',
      success: function(response) {
        callback(response.data, response.included);
      },
      error: function() {
        console.error('ja-jobs.js: API Request failed!');
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-API-LOCALE', CURRENT_LOCALE);
        xhr.setRequestHeader('Content-Type', 'application/vnd.api+json');
      }
    });
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
    var grossSalary = Math.round(hourlyPay['gross-salary']);

    var hours = jobAtrs.hours;
    var amount = hours * grossSalary;
    var maxDescriptionLength = 100;
    var shortDesc = jobAtrs['translated-text']['short-description'] || jobAtrs['short-description'];
    var description = shortDesc || (jobAtrs['translated-text']['description'] || jobAtrs['description']);
    var name = jobAtrs['translated-text'].name || jobAtrs.name;
    // description = truncate(description, maxDescriptionLength);

    innerHTML = formatTemplate(template, '%job_company%', company.name);
    innerHTML = formatTemplate(innerHTML, '%job_city%', company.city);
    innerHTML = formatTemplate(innerHTML, '%job_category%', category.name);
    innerHTML = formatTemplate(innerHTML, '%job_name%', name);
    innerHTML = formatTemplate(innerHTML, '%job_amount%', amount);
    innerHTML = formatTemplate(innerHTML, '%job_hours%', hours);
    innerHTML = formatTemplate(innerHTML, '%job_hourly_pay%', grossSalary);
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
