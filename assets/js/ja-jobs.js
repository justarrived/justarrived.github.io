(function(window) {
  var numberOfJobs = 3;
  var path = '/jobs?include=company,hourly_pay'
  var pageParam = '&page' + encodeURIComponent('[') + 'size' + encodeURIComponent(']') + '=' + numberOfJobs;
  var filterParam = '&filter' + encodeURIComponent('[') + 'hidden' + encodeURIComponent(']') + '=true';
  var filterParam = '';
  var sortParam = '&sort=-featured,filled,-job_date';
  var fieldsParam = [
    'fields' + encodeURIComponent('[') + 'company' + encodeURIComponent(']') + '=id,name,city',
    'fields' + encodeURIComponent('[') + 'jobs' + encodeURIComponent(']') + '=company,hourly_pay,id,name,city,short_description,description,translated_text,gross_amount_delimited',
    'fields' + encodeURIComponent('[') + 'hourly_pay' + encodeURIComponent(']') + '=id,gross_salary_with_unit'
  ].join('&');

  var baseURL = 'https://api.justarrived.se/api/v1';
  JOBS_ENDPOINT = baseURL + path + pageParam + filterParam + sortParam + fieldsParam;

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
        xhr.setRequestHeader('X-API-KEY-TRANSFORM', 'underscore');
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
    return getIncludedResource('hourly_pays', id, includedData);
  }

  function relationId(type, data) {
    return data.relationships[type].data.id;
  }

  function formatJobTemplate(template, jobData, includedData) {
    var innerHTML = '';
    var jobAtrs = jobData.attributes;
    var jobID = jobData.id;

    var companyId = relationId('company', jobData);
    var hourlyPayId = relationId('hourly_pay', jobData);

    var company = getCompanyName(includedData, companyId);
    var hourlyPay = getHourlyPayValue(includedData, hourlyPayId);
    var grossSalary = hourlyPay['gross_salary_with_unit'];

    var hours = jobAtrs.hours;
    var amount = jobAtrs['gross_amount_delimited'];
    var maxDescriptionLength = 100;
    var shortDesc = jobAtrs['translated_text']['short_description'] || jobAtrs['short_description'];
    var description = shortDesc || (jobAtrs['translated_text']['description'] || jobAtrs['description']);
    var name = jobAtrs['translated_text'].name || jobAtrs.name;
    description = truncate(description, maxDescriptionLength);

    innerHTML = formatTemplate(template, '%job_id%', jobID);
    innerHTML = formatTemplate(innerHTML, '%job_company%', company.name);
    innerHTML = formatTemplate(innerHTML, '%job_city%', jobAtrs.city);
    innerHTML = formatTemplate(innerHTML, '%job_name%', name);
    innerHTML = formatTemplate(innerHTML, '%job_amount%', amount);
    innerHTML = formatTemplate(innerHTML, '%job_hours%', hours);
    innerHTML = formatTemplate(innerHTML, '%job_hourly_pay%', grossSalary);
    return formatTemplate(innerHTML, '%job_description%', description);
  }

  function truncate(text) {
    var truncationLength = 90;
    var truncatedText = text.substring(0, truncationLength) + '...';
    return truncatedText;
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
