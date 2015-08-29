$("#wrapper").hide();
$("#column1 ul").hide();
$("#column2 p").hide();

$("#wrapper").fadeIn(4000);

$("#column1 h3").click(function() {
	$("#column1 ul").slideDown(1000);
});

$("#column2 h4").click(function() {
	$("#column2 p").slideDown(1000);
});

$("#thumbnails img").click(function() {
	$("#bigimage").hide();
	$("#bigimage").attr("src", $(this).attr("src"));
	$("#bigimage").fadeIn(200);
});