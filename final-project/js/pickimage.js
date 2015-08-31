$(document).ready(function() {

	$("#clickme").click(function(){

		// var imgSrc = 

		$("#blowupbox").css("background-image", "url("+$("#getme").val()+")");
	// 	/*$("#starwars").css("background-image", "url("+$("#getme").val()+")");*/
	// 	// });
	});

	$(".image70 img").click(function(){	
		var getUrl = $(this).attr("src");
		$("#starwars").attr("src", getUrl);
		/*$(this).attr("src", "images/preset/right-check-mark.png");*/
	});

	$(".image50 img").click(function(){
		var getUrl = $(this).attr("src");
		$("#starwars").attr("src", getUrl);
	});

	$(".image30 img").click(function(){
		var getUrl = $(this).attr("src");
		$("#starwars").attr("src", getUrl);
	});


});