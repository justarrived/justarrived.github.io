/*In order to access variables from _config.yml we are allowing this here,
* this so we only specify the categories in one location.
*/

jQuery(document).ready(function($) {
  var currentIndex = 0
  var rotateCarousel = true;

  var people = [{
                  'title': 'Sara Brandt, Västbyhem',
                  'text': 'Just Arrived removes all barriers working with newcomers.',
                  'img': 'sara-brandt.jpg'
                },
                {
                  'title': 'Johnny Warström, VD, Mentimeter',
                  'text': 'To hire through Just Arrived proved to be very simple and fast. The person who performed the task was both polite, curious and open. To get the chance to sit down together, enjoy food from Aleppo and to meet a new Swede made us reflect on the world around us, and gave us the chance at a warm moment together.',
                  'img': 'johnny-warstrom.jpg'
                },
                {
                  'title': 'Fredrik Skytt, VD, Utbudet',
                  'text': 'For us it was great to hire through Just Arrived. We contacted Just Arrived on Thursday and already on Monday we had a very competent person who started in our office. Everyone in the office thought it was amazing that we could do something to help a person into the society.',
                  'img': 'fredrik-skytt.png'
                }]

  changeInfo(currentIndex);

  setInterval(function(){
    currentIndex = (currentIndex + 1) % people.length
    if(rotateCarousel) {
      changeInfo(currentIndex)
    }
  }, 10000);

  $('.company-recomendation-name-cell').on('click', function(event) {
    var index = $.inArray(this, $('.company-recomendation-name-cell'));
    currentIndex = index
    rotateCarousel = false; // The carousel should stop rotating if the User makes a selection
    changeInfo(index)
  });

  // Change the info currently being displayed
  function changeInfo(index) {
    $('.company-recomendation-name-cell').removeClass('company-recomendation-name-cell-active');
    $('#p' + index).addClass('company-recomendation-name-cell-active');

    $('#profile-image').css('background-image', 'url(/assets/images/profile-pictures/' + people[index].img + ')')
    $('#profile-image').toggleClass('profile-circle-animation');

    setTimeout(function(){
      $('#profile-image').toggleClass('profile-circle-animation');
    }, 1500);

    $('#company-recommendation-current-text').text(people[index].text)

  }
});
