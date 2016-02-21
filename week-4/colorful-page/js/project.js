$(document).ready(function(){
	setInterval(function(){
	    boxAnimate()
	}, 1500);
});

function boxAnimate(){
	$(".box").each(function(){
		var size = Math.floor((Math.random()*200)+1);

		$(this).animate({
			left: Math.floor((Math.random()*($(window).width()-200))+1), 
			top: Math.floor((Math.random()*($(window).height()-200))+1),
			height: size,
			width: size
		}, Math.floor((Math.random()*1500)+1), "easeInOutBounce");
	});

	var color = "rgb(";
	color = color+(Math.floor((Math.random()*255)+1))+","+(Math.floor((Math.random()*255)+1))+","+(Math.floor((Math.random()*255)+1))+")";
	$("body").animate({
 		"background-color": color
 	}, 1500);
}