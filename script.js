"use strict";

$( document ).ready( function(){

  var maxLength = function(obj, val) {
    var toolTip = $(obj).closest(".form-group").children(".tooltip");
    var maxLengthText = (val - obj.value.length) + " characters remaining";
    var maxLengthTip = toolTip.children("#max-length");

    if ( obj.value.length > 0 ) {
      
      if ( maxLengthTip[0] ) {
        maxLengthTip.text(function () {
          return maxLengthText;
        });
      } else {
        toolTip.append("<div/>").find("div:last").attr("id", "max-length").text(function () {
          return maxLengthText;
        });
      }
      
    } else {
      maxLengthTip.remove();
    }
  };

  $("#text-input").on("input", function() {
    maxLength(this, 32);
  });

  $("#textarea-input").on("input", function() {
    maxLength(this, 140);
  });

  $("#password-input").on("input", function() {
    maxLength(this, 16);
  });

  $("#password-confirmation").on("input", function() {
    maxLength(this, 16);
  });

});