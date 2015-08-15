$(document).ready(function(){
	$("#sun").animate({
		"top": "2%", 
		"left": "50%"
	}, 5000, "easeOutExpo").animate({
		"top": "100%",
		"left": "0"
	}, 5000, "easeInExpo", makeItNight);

	$("#banner").fadeOut(10000);

	$("#cow").animate({
		"left": "100%"
	}, 5000, "easeInOutElastic", function(){ 
		$(this).css("left", "25%")
	});

	function makeItNight(){
		$("body").css({"background-image": "none","background-color": "#222255"});
		$("#body").remove();
		$("#sheep").remove();
		$("#cow").remove();
		$("#banner").html("Goodnight, Moon.").css("color", "white").fadeIn();
	}
});