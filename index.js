$(document).ready(function() { 

    var type = $('.js-donationType')

    // on load, fill the donation type div with one time donation information 

    var oneTime = `<h1>One-time Donation</h1>
    <button class="js-number" data-sku-id="sku_foo" data-id-amount="5">Donate Monthly $5.00</button>
    <button class="js-number" data-sku-id="sku_foo" data-id-amount="10">Donate Monthly $10.00</button>
    <button class="js-number" data-sku-id="sku_foo" data-id-amount="20">Donate Monthly $20.00</button>
    <input type="number" name="amount" class="js-amount sr-input" id="amount" placeholder="Other amount"></input>
    <button class="js-donate" data-sku-id="sku_HGVTCiLopfXurK">Donate </button>`;
    type.append(oneTime);

    // when the user clicks an amount, change the fee
    $('.js-number').on('click', function(){
      var val = parseInt($(this).attr('data-id-amount'));
      var fee = val * 0.05
      $('.fee-color').empty()
      $('.fee-color').append(`$${fee.toFixed(2)}`)
    })
    // when the user enters a custom amount, change the fee

    $('.js-amount').on('keyup', function(){
      var val = $(this).val()
      var fee = val * 0.05
      $('.js-donate').empty()
      $('.js-donate').append(`Donate $${$(this).val()}`);
      $('.fee-color').empty()
      $('.fee-color').append(`$${fee.toFixed(2)}`)
    })

  // when the input changes, change the text of the frequency section accordingly
    $('.js-frequency input').on('change', function() {
      type.empty()
      var frequency = ($('input[name=contribution]:checked', '.js-frequency').val());
      if (frequency === 'monthly') {
        var text = `<h1>Monthly Donation</h1>
        <button class="js-number" data-sku-id="sku_foo" data-id-amount="5">Donate Monthly $5.00</button>
        <button class="js-number" data-sku-id="sku_foo" data-id-amount="10">Donate Monthly $10.00</button>
        <button class="js-number" data-sku-id="sku_foo" data-id-amount="20">Donate Monthly $20.00</button>
      <input type="number" name="amount" class="js-amount sr-input" id="amount" placeholder="Other amount"></input>
      <button class="js-donate" data-sku-id="sku_foo">Donate </button>`;
      type.append(text)
      $('.fee-timing').empty()
      $('.fee-timing').append(' monthly')
      }
      if (frequency === 'one-time') {
        var text = `<h1>One-time Donation</h1>
        <button class="js-number" data-sku-id="sku_foo" data-id-amount="5">Donate Monthly $5.00</button>
    <button class="js-number" data-sku-id="sku_foo" data-id-amount="10">Donate Monthly $10.00</button>
    <button class="js-number" data-sku-id="sku_foo" data-id-amount="20">Donate Monthly $20.00</button>
        <input type="number" name="amount" class="js-amount sr-input" id="amount" placeholder="Other amount"></input>
        <button class="js-donate"data-sku-id="sku_foo">Donate </button>`;
        $('.fee-timing').empty()
      type.append(text)
      }
      if (frequency === 'annual') {
        var text = `<h1>Annual Donation</h1>
        <button class="js-number" data-sku-id="sku_foo" data-id-amount="5">Donate Monthly $5.00</button>
    <button class="js-number" data-sku-id="sku_foo" data-id-amount="10">Donate Monthly $10.00</button>
    <button class="js-number" data-sku-id="sku_foo" data-id-amount="20">Donate Monthly $20.00</button>
      <input type="number" name="amount" class="js-amount sr-input" id="amount" placeholder="Other amount"></input>
      <button class="js-donate" data-sku-id="sku_foo">Donate </button>`;
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

      // need to figure out how to make fee change on button click
      $('.js-number').on('click', function(){
        var val = $(this).attr('data-id-amount');
        var val = parseInt($(this).attr('data-id-amount'));
        var fee = val * 0.05
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

// updates items dictionary on payment proceed to checkout 

        $('.js-submit').click(function() {
          var frequency = ($('input[name=contribution]:checked', '.js-frequency').val());
          var fees = $('.js-fees').prop('checked');;
          console.log(frequency)
          console.log(fees);
          stripe
            .redirectToCheckout({
              items: [{
                clientReferenceId: [{sku: 'sku_foo', quantity: 20, installment_period: frequency, agreed_to_fees: fees}]
              }],
              successUrl: 'https://foo.com/success',
              cancelUrl: 'https://foo.com/canceld',
            })
            .then(handleResult);
        })
          





});
