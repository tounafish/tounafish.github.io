$(document).ready(function(){
	$(".thumb").click(function(){
	$("#bigimage").hide();
	$("#bigimage").attr("src", $(this.attr("src"));
	$("#bigimage").fadeIn(400);
	});
});