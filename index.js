var PUBLISHABLE_KEY = "pk_test_bI5YJUSyZgkUocI3uNa9bNMe00hdFhHQIU";
      var stripe = Stripe(PUBLISHABLE_KEY);
      // Handle any errors from Checkout
      var handleResult = function(result) {
        if (result.error) {
          var displayError = document.getElementById("error-message");
          displayError.textContent = result.error.message;
        }
      };
      var inputBox = document.querySelector('.js-amount');
      var donate = document.querySelector('.js-donate');
      var frequency = document.querySelector('.js-frequency')

      inputBox.onkeyup = function(){
        donate.textContent = `Donate $${inputBox.value}`;
      }

      document.querySelectorAll("button").forEach(function(button) {
        button.addEventListener("click", function(e) {
          stripe
            .redirectToCheckout({
              items: [{sku: 'sku_foo', quantity: 20}],
              successUrl: 'https://foo.com/success',
              cancelUrl: 'https://foo.com/canceld',
            })
            .then(handleResult);
        });
      });