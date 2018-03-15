(function(window) {
  var numberOfJobs = 3;
  var path = '/jobs?include=company,company.company_images'
  var pageParam = '&page' + encodeURIComponent('[') + 'size' + encodeURIComponent(']') + '=' + numberOfJobs;
  var filterParam = '&filter' + encodeURIComponent('[') + 'hidden' + encodeURIComponent(']') + '=true';
  var filterParam = '';
  var sortParam = '&sort=-featured,filled,-job_date';
  var fieldsParam = [
    'fields' + encodeURIComponent('[') + 'company' + encodeURIComponent(']') + '=id,name,city',
    'fields' + encodeURIComponent('[') + 'jobs' + encodeURIComponent(']') + '=company,id,name,hours,city,short_description,description,translated_text,gross_amount_delimited'
  ].join('&');

  var baseURL = 'https://api.justarrived.se/api/v1';
  JOBS_ENDPOINT = baseURL + path + pageParam + filterParam + sortParam + fieldsParam;

  function getJobsURL(opts) {
    var pageOffset = opts.pageOffset || 1;
    var pageOffsetParam = '&page' + encodeURIComponent('[') + 'number' + encodeURIComponent(']') + '=' + pageOffset;

    return JOBS_ENDPOINT +  pageOffsetParam;
  }

  function getJobs(callback) {
  $.ajax({
      url: getJobsURL({}),
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
        attributes['relationships'] = resource.relationships;
      }
    });
    return attributes;
  }

  function getCompany(includedData, id) {
    return getIncludedResource('companies', id, includedData);
  }

  function getCompanyImage(includedData, id) {
    return getIncludedResource('company_images', id, includedData);
  }

  function relationId(type, data) {
    return data.relationships[type].data.id;
  }

  function lastRelationId(type, data) {
    var relationData = data.relationships[type].data;
    if (!relationData) return null;

    var lastRelation = data.relationships[type].data[relationData.length -1];
    if (!lastRelation) return null;
    var lastId = lastRelation.id;
    return lastId;
  }

  function formatJobTemplate(template, jobData, includedData) {
    var innerHTML = '';
    var jobAtrs = jobData.attributes;
    var jobID = jobData.id;

    var companyId = relationId('company', jobData);
    var company = getCompany(includedData, companyId);
    var lastImageId = lastRelationId('company_images', company)
    var companyImage;
    var companyImageURL;
    if (lastImageId) {
      companyImage  = getCompanyImage(includedData, lastImageId);
    }
    if (companyImage) {
      companyImageURL = companyImage.image_url_large;
    } else {
      companyImageURL = "/assets/images/apple-touch-icon.png"
    }

    var hours = jobAtrs.hours;
    var maxDescriptionLength = 140;
    var shortDesc = jobAtrs['translated_text']['short_description'] || jobAtrs['short_description'];
    var description = shortDesc || (jobAtrs['translated_text']['description'] || jobAtrs['description']);
    var name = jobAtrs['translated_text'].name || jobAtrs.name;
    description = truncate(description, maxDescriptionLength);

    innerHTML = formatTemplate(template, '%job_id%', jobID);
    innerHTML = formatTemplate(innerHTML, '%job_company%', company.name);
    innerHTML = formatTemplate(innerHTML, '%job_city%', jobAtrs.city);
    innerHTML = formatTemplate(innerHTML, '%job_name%', name);
    innerHTML = formatTemplate(innerHTML, '%job_company_image_url%', companyImageURL);
    return formatTemplate(innerHTML, '%job_description%', description);
  }

  function truncate(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
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
