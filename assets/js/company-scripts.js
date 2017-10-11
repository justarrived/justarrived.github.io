---
---

/*In order to access variables from _config.yml we are allowing this here,
* this so we only specify the categories in one location.
*/

jQuery(document).ready(function($) {
  var currentIndex = 0
  var rotateCarousel = true;

  var people = [{
                  'title': 'Sara Brandt, Västbyhem',
                  'text': '{% t vasbyhem_testimonial.first_body %}',
                  'img': 'sara-brandt.jpg'
                },
                {
                  'title': 'Johnny Warström, VD, Mentimeter',
                  'text': '{% t testimonials.mentimeter.first %}',
                  'img': 'johnny-warstrom.jpg'
                },
                {
                  'title': 'Fredrik Skytt, VD, Utbudet',
                  'text': '{% t testimonials.utbudet.first %}',
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
