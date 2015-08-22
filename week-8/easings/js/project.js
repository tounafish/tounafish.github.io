$(document).ready(function(){
	$(".box").click(function(){
		$(this).animate({
			top: "80%", 
			height: "30%",
			backgroundColor: "rgb(0,0,0)"
		}, 5000, "easeOutBounce");
	});
});