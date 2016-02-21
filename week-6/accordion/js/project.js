$(document).ready(function(){
	$("header").click(function(){
		$(this).next().slideToggle(500);
	});
});


$(document).ready(function(){
	$("header").click(function(){
		if(!$(this).hasClass("open")) {
			$(".wrapper").slideUp(500);
			$(this).addClass("open");
			$()  **incomplete**
		}
	});
});