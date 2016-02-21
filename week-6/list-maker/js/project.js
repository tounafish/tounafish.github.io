$(document).ready(function(){
	$("#clickme").click(function(){
  	$("ul").prepend("<li>"+$("#item").val()+"</li>");
  });
});



/*
Long way with effects:
var listItem = $("<li/");
listItem.html($("item").val());
listItem.hide();
$("ul".append(listItem);
listItem.fadeIn(500);

or

Most refactored way with effects:
$("ul").append($("li/").html($("#item").val()).fadeIn(500));

or

String-only way:
$("ul").prepend("<li>"+$("#item").val()+"</li>");
*/