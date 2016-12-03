function submitPromoCode() {
    var promoCode = jQuery('#promo-code-input').val();
    var appURL = 'https://app.justarrived.se';

    // Live URL
    var url = 'https://api.justarrived.se/api/v1/promo-codes/validate';
    var payload = {
      data: {
        attributes: {
          'promo-code': promoCode
        }
      }
    };

    var successFunction = function (data) {
      setTimeout(function(){
        location.href = appURL + '/#/?promo_code=' + promoCode;
      }, 2000);

      var node = document.getElementById("promo-success");
      node.innerHTML = "<span class=\"success-message\">" + "Great, we'll redirect you to the app now" + "</span>";

      var hideNode = document.getElementById("promo-error");
      hideNode.innerHTML = "";
    };

    var failFunction = function (data) {
      var errorMessage = 'Promo code ' + data.responseJSON.errors[0].detail;
      var node = document.getElementById("promo-error");
      node.innerHTML = "<span class=\"error-message\">" + "Sorry, " + errorMessage + "</span>";
    };

    jQuery.ajax({
      type: 'POST',
      url: url,
      data: payload,
      dataType: 'json',
			statusCode: {
				200: successFunction,
			  422: failFunction
		  }
    });

    return false;
  }
