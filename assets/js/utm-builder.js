(function(window) {
  function insertSearchPartsToHref(href, searchParts) {
    var extraSearch = searchParts.join('&');
    var parser = document.createElement('a');
    parser.href = href;

    var search;
    if (parser.search.length > 0) {
      search = [parser.search, extraSearch].join('&');
    } else {
      search = '?' + extraSearch;
    }

    return [
      parser.protocol + '//', // => "http:"
      parser.hostname,        // => "example.com"
      parser.pathname,        // => "/pathname/"
      search,                 // => "?search=test"
      parser.hash             // => "#hash"
    ].join('');
  }

  function buildUTMHref(website, source, medium, campaign, term, content) {
    var searchParts = [
      'utm_source=' + source,
      'utm_medium=' + medium
    ];

    if (campaign) {
      searchParts.push('utm_campaign=' + campaign);
    }
    if (term) {
      searchParts.push('utm_term=' + term);
    }
    if (content) {
      searchParts.push('utm_content=' + content);
    }

    return insertSearchPartsToHref(website, searchParts);
  }

  function utmBuilerFormSubmit() {
    var $form = $('.js-utm-builder-form');
    var $resultArea = $('.js-utm-result');

    var $url = $('#url');
    var $campaignSource = $('#campaign_source');
    var $campaignMedium = $('#campaign_medium');

    // Optional
    var $campaignName = $('#campaign_name');
    var $campaignTerm = $('#campaign_term');
    var $campaignContent = $('#campaign_content');

    var website = $url.val();
    if (website.indexOf('http:') === -1 && website.indexOf('https:') === -1) {
      website = 'http://' + website;
    }
    var href = buildUTMHref(
      website,
      $campaignSource.val(),
      $campaignMedium.val(),
      $campaignName.val(),
      $campaignTerm.val(),
      $campaignContent.val()
    );
    $resultArea.html('<code>' + href + '</code>');

    return false;
  }

  window.utmBuilerFormSubmit = utmBuilerFormSubmit;
})(window);
