$(document).ready(function() {$("#clickme").click(function(){
	/*$("#blowupbox").css("background-image", "url("+$("#getme").val()+")");*/
	$("#starwars").css("background-image", "url("+$("#getme").val()+")");
	});
});


$(".p70 img").click(function(){
	var geturl = $(this).val();
	$("img#starwars").src(geturl);
	});
});

$(".p50 img").click(function(){
	var geturl = $(this).val();
	$("img#starwars").src(geturl);
	});
});

$(".p30 img").click(function(){
	var geturl = $(this).val();
	$("img#starwars").src(geturl);
	});
});


