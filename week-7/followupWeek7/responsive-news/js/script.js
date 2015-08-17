// document.getElementById("menu-toggle").onclick = function(){
// 	document.getElementsByTagName("nav")[0].style.display = "block";
// };

$(document).ready(function(){
	$("#menu-toggle").click(function(){
		$("nav").fadeToggle(200);
		// $("nav").css("left", "100%").animate({left: 0}, 200);
	});
});

$(window).resize(function(){
	if($(window).width() > 500) {
		$("nav").attr("style", "");
	}
});