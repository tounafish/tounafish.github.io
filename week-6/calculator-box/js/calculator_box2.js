$(document).ready(function(){
	$(".combine").click(function(){
		$("#white").html( parseInt($("#white").html()) + parseInt($(this).html()) );
	});

	$(".change-color").click(function(){
		$("#white").css("background-color"), $(this).attr("id"));
		if ($(this).attr("id") == "white") {
			$("#white").html(0);
		}
	});
});




/*	LONG WAY
	$("#a10").click(function(){
		total = total + 10;
		$("#out").html(total);
	});
	$("#a20").click(function(){
		total = total + 20;
		$("#out").html(total);	
	});
	$("#a30").click(function(){
		total = total + 30;
		$("#out").html(total);	
	});
	$("#n10").click(function(){
		total = total - 10;
		$("#out").html(total);	
	});
	$("#n20").click(function(){
		total = total - 20;
		$("#out").html(total);	
	});
	$("#n30").click(function(){
		total = total - 30;
		$("#out").html(total);	
	});

	$("#red").click(function(){
		$("#out").css("background-color", "red");
	});

	$("#blue").click(function(){
		$("#out").css("background-color", "blue");
	});

	$("#out").click(function(){
		$("#out").css("background-color", "white");
	});

	$("#out").click(function(){
		total = 0;
		$("#out").html(total);*/