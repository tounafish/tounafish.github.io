$(document).ready(function(){
	$("nav a").click(function(){
		$("nav a").removeClass();
		$(this).addClass("current");
		var nextSlide = "#Slide"+$(this).html();
		$(".slide.current").fadeOut(300, function(){
			$(".slide.current").removeClass("current");
			$(nextSlide).show().addClass("current");
		});	
	});
};


$(document).ready(function(){
	$("nav a").click(function(){
		$("nav a").removeClass();
		$(this).addClass("current");
		var nextSlide = $(this.index();
		$(".slide.current").fadeOut(300, function(){
			$(".slide.current").removeClass("current");
			$(".slide").eq(nextSlide).show().addClass("current");
		});	
	});
};