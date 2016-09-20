var body = document.getElementsByTagName('body')[0];
var locale = body.getAttribute('data-lang');

// var message = document.getElementById('cookie-banner-message').innerHTML;
var templateName = 'cookie-banner';
// en locale has no path prefix
if (locale !== 'en') {
  templateName = '/' + locale + '/' + templateName;
}

CookieDisclaimer.init({
  name: 'JustArrivedCookieAccept',
  message: '',
  template: templateName
});
