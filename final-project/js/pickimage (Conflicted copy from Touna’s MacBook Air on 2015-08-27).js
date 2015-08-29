$(document).ready(function() {

	// $("#clickme").click(function(){
	// 	$("#blowupbox").css("background-image", "url("+$("#getme").val()+")");
	// 	/*$("#starwars").css("background-image", "url("+$("#getme").val()+")");*/
	// 	// });
	// });

	console.log('working')

	$(".image70 img").click(function(){	
		console.log('working2')

		var getUrl = $(this).attr("src");
		$("#starwars").attr("src", getUrl);
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