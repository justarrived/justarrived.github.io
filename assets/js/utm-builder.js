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

  function buildUTMHref(website, campaignSource, campaignMedium) {
    var searchParts = [
      'utm_source=' + campaignSource,
      'utm_medium=' + campaignMedium
    ];
    return insertSearchPartsToHref(website, searchParts);
  }

  function utmBuilerFormSubmit() {
    var $form = $('.js-utm-builder-form');
    var $resultArea = $('#utm-result');

    var $url = $('#url');
    var $campaignSource = $('#campaign_source');
    var $campaignMedium = $('#campaign_medium');

    // Optional
    // var $campaignName = $('#campaign_name');
    // var $campaignTerm = $('#campaign_term');
    // var $campaignContent = $('#campaign_content');

    var website = $url.val();
    if (website.indexOf('http:') === -1 && website.indexOf('https:') === -1) {
      website = 'http://' + website;
    }
    var href = buildUTMHref(website, $campaignSource.val(), $campaignMedium.val());
    $resultArea.html('<code>' + href + '</code>');

    return false;
  }

  window.utmBuilerFormSubmit = utmBuilerFormSubmit;
})(window);
