jQuery(document).ready(function($) {
  var people = [{
                  'title': 'First: Sara Brandt, Västbyhem',
                  'text': 'First: För oss var det otroligt bra att anställa visa Just Arrived. Vi kontaktade Just Arrived på torsdagen och redan på måndagen hade vi en mycket duktig person som började på vårt kontor. Alla på kontoret tyckte det var fantastiskt bra att vi kunde hjälpa någon att komma in i sammhället.',
                  'img': '../images/profile-pictures/sara-brandt.jpg'
                },
                {
                  'title': 'Second: Sara Brandt, Västbyhem',
                  'text': 'Second: För oss var det otroligt bra att anställa visa Just Arrived. Vi kontaktade Just Arrived på torsdagen och redan på måndagen hade vi en mycket duktig person som började på vårt kontor. Alla på kontoret tyckte det var fantastiskt bra att vi kunde hjälpa någon att komma in i sammhället.',
                  'img': '../images/profile-pictures/johnny-warstrom.jpg'
                },
                {
                  'title': 'Third: Sara Brandt, Västbyhem',
                  'text': 'Third: För oss var det otroligt bra att anställa visa Just Arrived. Vi kontaktade Just Arrived på torsdagen och redan på måndagen hade vi en mycket duktig person som började på vårt kontor. Alla på kontoret tyckte det var fantastiskt bra att vi kunde hjälpa någon att komma in i sammhället.',
                  'img': '../images/profile-pictures/fredrik-skytt.png'
                }]

  //changeInfo(0)

  $('.company-recomendation-name-cell').on('click', function(event) {
    $('.company-recomendation-name-cell').removeClass('company-recomendation-name-cell-active');
    $(this).addClass('company-recomendation-name-cell-active');

    var index = $.inArray(this, $('.company-recomendation-name-cell'));
    changeInfo(index)
  });

  function changeInfo(index) {
    //$('.company-recomendation-name-cell').removeClass('company-recomendation-name-cell-active');
    //$('.company-recomendation-name-cell')[index].addClass('company-recomendation-name-cell-active'); // Doesn't work
    $('#company-recommendation-current-text').text(people[index].text)
    $('#company-recommendation-current-name').text(people[index].title)
  }
});
