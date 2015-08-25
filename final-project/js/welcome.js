$(document).ready(function () {
    $("div.hidden").fadeIn(3000, function(){
	    $("div.letter").animate({
		    "top": "100%", 
		    "left": "100%"
		  }, 200);
    }).removeClass("hidden");

    $("div h1").fadeOut(6000);
   	/*$(".crazyidea").removeClass();*/

   
});