$(document).ready(function(){

	setUp();

	$("body").mouseenter(function(){
		$("h1").fadeOut(500);
	});

	//Audio will go here

	//Pacman animations will go here

});

function setUp() {
	$("body, html, #wrapper").height($(window).height());
	$("body, html, #wrapper").width($(window).width());
}

$(window).resize(function() {
	setUp();
});