/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$("document").ready(function() {
    $("#subscribe").submit(function() {
        var data = {
            "action": "subscribe"
        };
        data = $(this).serialize() + "&" + $.param(data);
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "http://antunskuric.890m.com/assets/php/subscribe.php", //Relative or absolute path to response.php file
            data: data,
            success: function(data) {
                if(data["done"]){
                    $("#subscribe-success").css('display','block');
                }else{
                    $("#subscribe-error").css('display','block');
                }
            }
        }); 
        return false;
    });
});


$("document").ready(function() {
    $("#preorder").submit(function() {
        var data = {
            "action": "preorder"
        };
        data = $(this).serialize() + "&" + $.param(data);
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "http://antunskuric.890m.com/assets/php/subscribe.php", //Relative or absolute path to response.php file
            data: data,
            success: function(data) {
                if(data["done"]){
                    $("#preorder-success").css('display','block');
                }else{
                    $("#preorder-error").css('display','block');
                }
            }
        }); 
        return false;
    });
});

$("document").ready(function() {
    $("#contact").submit(function() {
        var data = {
            "action": "contact"
        };
        data = $(this).serialize() + "&" + $.param(data);
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "http://antunskuric.890m.com/assets/php/subscribe.php", //Relative or absolute path to response.php file
            data: data,
            success: function(data) {
                if(data["done"]){
                    $("#contact-success").css('display','block');
                }else{
                    $("#contact-error").css('display','block');
                }
            }
        }); 
        return false;
    });
});