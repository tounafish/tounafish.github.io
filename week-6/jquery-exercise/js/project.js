/*project.js*/

$(document).ready(function(){
	$("p").click(function(){
		$(this).hide();
	});

	$("p").eq(2).css({
		"color": "white", 
		"background-color": "red", 
		"fontSize": "30px"});
});

