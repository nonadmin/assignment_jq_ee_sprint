"use strict";

$( document ).ready( function() {
  $("#dropdown-select").on("click", function() {
    $(".option").slideToggle(100);
    $("#dropdown").toggleClass("dropdown-active");
  });

  $("#dropdown").mouseleave( function() {
    $(this).removeClass("dropdown-active");
    $(".option").slideUp(100);
  });

  $(".option").hover( 
    function() { $(this).addClass("option-active"); },
    function() { $(this).removeClass("option-active");}
  );

  $(".option").on("click", function(){
    var optionValue = $("<input>").attr("type", "hidden")
                                  .attr("name", "snack")
                                  .val($(this).text());
    $("form").append(optionValue).submit();

    // populate input rather than create elements
  });

});