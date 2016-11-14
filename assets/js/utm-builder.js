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

  var baseUrl = $url.val();
  var urlParts = [
    'utm_source=' + $campaignSource.val(),
    'utm_medium=' + $campaignMedium.val()
  ]
  var result = baseUrl + '?' + urlParts.join('&');

  if (baseUrl.indexOf('?') !== -1 || baseUrl.indexOf('&') !== -1 || baseUrl.indexOf('#') !== -1) {
    result = 'Oh, oh ERROR! <br><br> Unsupported characters ?, & or # found in website. <br> This is not yet supported, please bug a developer about it..'
  }

  $resultArea.html('<code>' + result + '</code>');

  return false;
}
