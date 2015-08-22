$(document).ready(function () {
    $("div.hidden").fadeIn(3000).removeClass("hidden");
    $("div.letter").animate({
    "top": "100%", 
    "left": "100%"
  }, 200);
});