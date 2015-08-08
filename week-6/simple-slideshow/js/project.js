$(document).ready(function(){
	$("nav a").click(function(){
		$("nav a").removeClass();
		$(this).addClass("current");
		$(".slide.current").fadeOut(500, function(){})
		$(".slide.current").removeClass("current");
		$("#slide"+$(this.html()).addClass("current");
	});
};