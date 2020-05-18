(function($){
  $.fn.getFormData = function(){
    var data = {};
    var dataArray = $(this).serializeArray();
    for(var i=0;i<dataArray.length;i++){
      data[dataArray[i].name] = dataArray[i].value;
    }
    return data;
  }
})(jQuery);



// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = Stripe('pk_live_I0WPk1A4ya83GbDGcDZpidI900xClBV8Qf');
var elements = stripe.elements();

// Set up Stripe.js and Elements to use in checkout form
var style = {
    base: {
        color: "#32325d",
    }
};

  var elementStyles = {
    base: {
//      color: '#fff',
//      fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

    },
    invalid: {
      color: '#fff',
      ':focus': {
        color: '#FA755A',
      },
      '::placeholder': {
        color: '#FFCCA5',
      },
    },
  };
var card = elements.create("card", { style: style });
card.mount("#card-element");
card.addEventListener('change', ({error}) => {
    const displayError = document.getElementById('card-errors');
    if (error) {
        $("#card-errors").html(error.message);
        $("#card-errors").css("display","block");
    } else {
        $("#card-errors").html('');
        $("#card-errors").css("display","none");
}
});

var form = document.getElementById('payment-form');

form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    
    $("#pay-submit").prop('disabled',true);
    
    var price_data = {
        qty: parseInt($("#qty").html()),
        unit_price: 20,
        shipping_price: parseInt($("#shipping").html())
    };
    var data = $(this).getFormData();
    var data_serialized = $(this).serialize();
    
    // try the payment
    getSecret("https://antunskuric.com/assets/php/secret.php", price_data).then(function(responseJson) {
        var clientSecret = responseJson.client_secret;
        // Call stripe.confirmCardPayment() with the client secret.
        stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: data.name,
                    email: data.email,
                    phone: data.tel,
                }
            }
        }).then(function (result) {
            // if errror show it to the user
            if (result.error) {
                // Show error to your customer (e.g., insufficient funds)
                $("#card-errors").html(result.error.message);
                $("#card-errors").css("display","block");
                $("#pay-submit").prop('disabled',false);
            } else {
                // The payment has been processed!
                if (result.paymentIntent.status === 'succeeded') {
                    
                    // add the order to the database
                    var data_action = {
                        "action": "order",            
                    };
                    data = data_serialized + "&" + $.param(data_action)+ "&" +$.param(price_data);
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "https://antunskuric.com/assets/php/payment.php", //Relative or absolute path to response.php file
                        data: data,
                        success: function(data) {
                            if(data["done"]){
                                window.location.replace("success");
                            }else{
                                window.location.replace("success?problem=1");
                            }
                        }
                    }); 
                    // redirect to the success website
                }
            }
        });
    });
});
     

$("document").ready(function () {
    $("#add-qty").click(function () {
        var qty = parseInt($("#qty").html()) + 1;
        $("#qty").html(qty);
        $("#price").html(qty * 20);
        $("#full").html(parseInt($("#price").html()) + parseInt($("#shipping").html()));
    });
    $("#remove-qty").click(function () {
        var qty = parseInt($("#qty").html()) - 1;
        if (qty < 1) qty = 1;
        $("#qty").html(qty);
        $("#price").html(qty * 20);
        $("#full").html(parseInt($("#price").html()) + parseInt($("#shipping").html()));
    });
    $(document).on('click touch tap', ".ship-zone", function () {
        $(".ship-zone").removeClass("btn-primary");
        $(".ship-zone").addClass("btn-default");
        $(this).removeClass("btn-default");
        $(this).addClass("btn-primary");
        
        if($(this).attr('id') == "world"){
            $("#shipping").html('25');
        }else{
            $("#shipping").html('15');
        }
        $("#full").html(parseInt($("#price").html()) + parseInt($("#shipping").html()));
    });
});

// Example POST method implementation:
async function getSecret(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      //'Content-Type': 'application/json'
       'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: $.param(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}