$(document).ready(function(){

	if($(".slide").length > 1) {
		$(".next").show();
	}

	$(".next").click(function(){
		$(".prev").show();

		$(".current").removeClass("current").next().addClass("current");

		$("#message").html($(".current").attr("alt"));

		if($(".current").is(":last-of-type")) {
			$(".next").hide();	
		}
	});
	
	$(".prev").click(function(){
		$(".next").show();	

		$(".current").removeClass("current").prev().addClass("current");;

		$("#message").html($(".current").attr("alt"));

		if($(".current").is(":first-of-type")) {
			$(".prev").hide();		
		}
	});	
});