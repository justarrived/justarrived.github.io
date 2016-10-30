(function(window) {
  function openPopup(selector) {
    $('.cd-popup').removeClass('is-visible');
    $(selector).addClass('is-visible');
  };

  function initPopups() {
    // Open newcomer signup popup
    $('.cd-popup-trigger-newcomer-signup').on('click', function(event){
      event.preventDefault();
      openPopup('.cd-popup-newcomer-signup');
    });

    //open signup popup
    $('.cd-popup-trigger-signin').on('click', function(event){
      event.preventDefault();
      openPopup('.cd-popup-signin');
    });

    //open job card popup
    $(document).on('click', '.cd-popup-trigger-job-card', function(event){
      event.preventDefault();
      openPopup('.cd-popup-job-card-popup');
    });

    //open promo popup
    $('.cd-popup-trigger-promo').on('click', function(event){
      event.preventDefault();
      openPopup('.cd-popup-promo');

      // Remove previously entered promo code when
      // reopening the popup
      var hello = document.getElementById("promo-code-input");
      var hi = document.getElementById("promo-error");
      hello.value = "";
      hi.innerHTML = "";
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
