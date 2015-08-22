$(document).ready(function(){

	setUp();

	$("body").mouseenter(function(){
		$("h1").fadeOut(500);
	});

	//Audio will go here
	$("volume").click(function(){
		$(this).toggleClass("fa-volume-off");
		$(this).toggleClass("fa-volume-up");

		if($(this).hasClass("fa-volume-up")) {
			$("audio")[0].play();
		}
		else {
			$("audio")[0].pause();
		}
	});

	//Pacman animations will go here
	$("#ghost").click(function(){
		$("ghoste").animate({ left: "100%" }, 1000, "easeOutBounce");
	});

});

function setUp() {
	$("body, html, #wrapper").height($(window).height());
	$("body, html, #wrapper").width($(window).width());
}

$(window).resize(function() {
	setUp();
});