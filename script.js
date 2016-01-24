"use strict";

var toolTip = function(field, tipText, tipID) {
  var tipParent = field.closest(".form-group").children(".tooltip");
  var tipDiv = tipParent.children(("#" + tipID));

  if ( field.val().length > 0 ) {
    
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


var maxLength = function(field, val) {
  var maxLengthText = (val - field.val().length) + " characters remaining";
  toolTip(field, maxLengthText, "max-length");
};


var passwordMatch = function(confirm_field, password_field) {
  if (confirm_field.val() !== password_field.val()) {
    toolTip(confirm_field, "confirmation does not match", "pw-confirm");
  } else {
    $("#pw-confirm").remove();
  }
};


var addFieldError = function(field, errorText, errorID) {
  var fieldParent = field.closest(".form-group");
  var errorDiv = $("<div>").addClass("error-text")
                           .attr("id", "error-" + errorID)
                           .text(errorText);

  if (!(fieldParent.children("#error-" + errorID)[0])) {  
    fieldParent.children().last().after(errorDiv);
    fieldParent.addClass("error-group");
  }
};


var removeFieldError = function(field, errorID) {
  var fieldParent = field.closest(".form-group");
  var errorDiv = fieldParent.children("#error-" + errorID);

  errorDiv.remove();

  if (!(fieldParent.children(".error-text")[0])) {
    fieldParent.removeClass("error-group");
  }
};


var validateField = function(field, criteria, errorText, errorID){
  if (!criteria) {
    addFieldError(field, errorText, errorID);
  } else {
    removeFieldError(field, errorID);
  }
};

var between = function(num, min, max) {
  return num >= min && num <= max;
};

$( document ).ready( function(){
  //event handlerz
  var text = $("#text-input");
  var textArea = $("#textarea-input");
  var password = $("#password-input");
  var pwConfirm = $("#password-confirmation");

  text.on("input", function() {
    maxLength($(this), 32);
  });

  textArea.on("input", function() {
    maxLength($(this), 140);
  });

  password.on("input", function() {
    maxLength($(this), 16);
  });

  pwConfirm.on("input", function() {
    maxLength($(this), 16);
    passwordMatch($(this), $("#password-input"));
  });

  $("form").on("submit", function() {
    validateField(text, between(text.val().length, 6, 16),
                        "too short", "short");

    validateField(textArea, between(textArea.val().length, 4, 140),
                        "too short", "short");

    validateField(password, between(password.val().length, 6, 16),
                        "too short", "short");

    validateField(pwConfirm, between(pwConfirm.val().length, 6, 16),
                        "too short", "short");

    validateField(pwConfirm, (password.val() === pwConfirm.val()),
                        "confirmation does not match", "pw-confirm");

    return false;
  });

});