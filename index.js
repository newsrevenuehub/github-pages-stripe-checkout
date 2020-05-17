$(document).ready(function() { 

    
    // client reference dictionary 
    


    // on load, fill the donation type div with one time donation information 

    var oneTime = `<h1>One-time Donation</h1>
    <button data-sku-id="sku_GU4JYXyvvRb2sX">Donate $5.00</button>
    <input type="number" name="amount" class="js-amount sr-input" id="amount" placeholder="Other amount"></input>
    <button class="js-donate" data-sku-id="sku_HGVTCiLopfXurK">Donate </button>`;
    type.append(oneTime);

    // when the user enters a custom amount, change the donate button

    $('.js-amount').on('keyup', function(){
      var val = $(this).val()
      var fee = val * 0.05
      $('.js-donate').empty()
      $('.js-donate').append(`Donate $${$(this).val()}`);
      $('.fee-color').empty()
      $('.fee-color').append(`$${fee.toFixed(2)}`)
    })

    var type = $('.js-donationType')

  // when the input changes, change the text of the frequency section accordingly
    $('.js-frequency input').on('change', function() {
      type.empty()
      var frequency = ($('input[name=contribution]:checked', '.js-frequency').val());
      if (frequency === 'monthly') {
        var text = `<h1>Monthly Donation</h1>
      <button data-sku-id="sku_GU4JYXyvvRb2sX">Donate Monthly $5.00</button>
      <input type="number" name="amount" class="js-amount sr-input" id="amount" placeholder="Other amount"></input>
      <button class="js-donate" data-sku-id="sku_HGVTCiLopfXurK">Donate </button>`;
      type.append(text)
      $('.fee-timing').empty()
      $('.fee-timing').append(' monthly')
      }
      if (frequency === 'one-time') {
        var text = `<h1>One-time Donation</h1>
        <button data-sku-id="sku_GU4JYXyvvRb2sX">Donate $5.00</button>
        <input type="number" name="amount" class="js-amount sr-input" id="amount" placeholder="Other amount"></input>
        <button class="js-donate" data-sku-id="sku_HGVTCiLopfXurK">Donate </button>`;
        $('.fee-timing').empty()
      type.append(text)
      }
      if (frequency === 'annual') {
        var text = `<h1>Annual Donation</h1>
      <button data-sku-id="sku_GU4JYXyvvRb2sX">Donate Annually $5.00</button>
      <input type="number" name="amount" class="js-amount sr-input" id="amount" placeholder="Other amount"></input>
      <button class="js-donate" data-sku-id="sku_HGVTCiLopfXurK">Donate </button>`;
      $('.fee-timing').empty()
      $('.fee-timing').append(' annually')
      type.append(text)
      }
      
      $('.js-amount').on('keyup', function(){
        var val = $(this).val()
        var fee = val * 0.05
        $('.js-donate').empty()
        $('.js-donate').append(`Donate $${$(this).val()}`);
        $('.fee-color').empty()
        $('.fee-color').append(`$${fee.toFixed(2)}`)
      })
   });





    // stripe boilerplate code 

    var PUBLISHABLE_KEY = "pk_test_bI5YJUSyZgkUocI3uNa9bNMe00hdFhHQIU";
      var stripe = Stripe(PUBLISHABLE_KEY);
      // Handle any errors from Checkout
      var handleResult = function(result) {
        if (result.error) {
          var displayError = document.getElementById("error-message");
          displayError.textContent = result.error.message;
        }
      };

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



});
