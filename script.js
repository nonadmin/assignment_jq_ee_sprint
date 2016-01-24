"use strict";

var toolTip = function(obj, tipText, tipID) {
  var tipParent = obj.closest(".form-group").children(".tooltip");
  var tipDiv = tipParent.children(("#" + tipID));

  if ( obj.val().length > 0 ) {
    
    if ( tipDiv[0] ) {
      tipDiv.text(tipText);
    } else {
      tipParent.append("<div/>").find("div:last")
                  .attr("id", tipID).text(tipText);
    }
    
  } else {
    tipDiv.remove();
  }
};

var maxLength = function(obj, val) {
  var maxLengthText = (val - obj.val().length) + " characters remaining";
  toolTip(obj, maxLengthText, "max-length");
};


var passwordMatch = function(confirm_field, password_field) {
  if (confirm_field.val() !== password_field.val()) {
    toolTip(confirm_field, "confirmation does not match", "pw-confirm");
  } else {
    $("#pw-confirm").remove();
  }
};

$( document ).ready( function(){
  //event handlerz

  $("#text-input").on("input", function() {
    maxLength($(this), 32);
  });

  $("#textarea-input").on("input", function() {
    maxLength($(this), 140);
  });

  $("#password-input").on("input", function() {
    maxLength($(this), 16);
  });

  $("#password-confirmation").on("input", function() {
    maxLength($(this), 16);
    passwordMatch($(this), $("#password-input"));
  });

});