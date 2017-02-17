(function(window) {
  function openPopup(selector) {
    $('.cd-popup').removeClass('is-visible');
    $(selector).addClass('is-visible');
  };

  function initPopups() {
    //open signup popup
    $('.cd-popup-trigger-signin').on('click', function(event){
      event.preventDefault();
      openPopup('.cd-popup-signin');
    });

    //open xmas popup
    $('.cd-popup-trigger-xmas').on('click', function(event){
      event.preventDefault();
      openPopup('.cd-popup-xmas');
    });

    //open job card popup
    $(document).on('click', '.cd-popup-trigger-job-card', function(event){
      event.preventDefault();
      openPopup('.cd-popup-job-card-popup');
    });

    //close popup
    $('.cd-popup').on('click', function(event){
      if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
        event.preventDefault();
        $(this).removeClass('is-visible');
      };
    });

    //close popup when clicking the esc keyboard button
    $(document).keyup(function(event){
      if(event.which == '27'){
        $('.cd-popup').removeClass('is-visible');
      }
    });
  };

  window.Popups = { init: initPopups };
})(window);
