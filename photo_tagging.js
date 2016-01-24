"use strict";
var friends = ["Leah", "Biggie", "Justin"];

$( document ).ready( function(){
  var tagBox = function(){
    return $("<div>").attr({class: "tag-box tag-active", id: "active"});
  };

  var friendList = function(){
    return $("<ul>").append(function(){
      var listElems = "";
      $.each(friends, function(i, val){
        listElems += "<li>" + val + "</li>";
      });
      return listElems;
    });
  };

  $(".photo-container").hover( 
    function(){
      $(this).append(tagBox());
    },

    function(){
      $("#active").remove();
    }
  );

  $(".photo-container").on("mousemove", function(event){
    $("#active").offset({top: (event.pageY - 50), left: (event.pageX - 50)});
  });


  $(".photo-container").click( function(){
    $("#active").attr({"id": "pending", "class": "tag-box tag-set"})
                    .append(function() {
      return $("<div>").addClass("friend-list").append(friendList());
    });
  });

  $(".photo-container").on({
    mouseenter: function (event) {
      $(event.target).addClass("active");
    },
    mouseleave: function (event) {
      $(event.target).removeClass("active");
    },
    click: function(event) {
      event.stopImmediatePropagation();
      
      $("#pending").attr({"id": ""});
      $(event.target).parent().children().not(event.target).remove();
      $(event.target).attr("class", "set");
      $(".photo-container").append(tagBox());
    }
  }, "li");

  $(".photo-container").on("mouseleave", "#pending", function(){
    $("#pending").remove();
  });



      // $("#pending").mouseleave(function(){
    //   $(this).replaceWith(tagBox());
    // });

});