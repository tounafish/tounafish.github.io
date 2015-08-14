$( document ).ready(function() {
	$(".moveit").mouseover(move);
	$(".moveit").mouseleave(complete);
	$("button[class]").click(backgrounde);
	$("#sunny").mouseover(sunmove);
	});


	function backgrounde() {
		var num = $(this).index();
		$(".fixeded").addClass("hide");
		$("#back" + num).removeClass("hide");
		$("#sunny").css("margin-left", (num += 1) * "165");
	}

	function move() {
		$(this).animate({ left: "100%" }, 1500);
	}

	function complete() {
		$(this).animate({ left: "100%" }, 0);
	}

	function sunmove() {
		$("#sunny").animate({ top: "65%", width: "220%" }, 4000);
		$("#sunny").animate({ top: "10%", width: "220%" }, 1000);
	}



/*		function sunmove() {
		var movesun = (index of the button clicked + 1) * 100;
		$("#sunny").animate({ top: var }, 4000);
	}*/



	// I did not write this part. I copied it from Stackoverflow. 
	// But it does make sense to me (for the most part).
	// You declare two variables, then call "rotate()".
	// You change the CSS property of the id "test".
	// I'm not sure about this part: {'rotate(' + degree + 'deg)'}.
	// It's not a CSS property I'm aware of.
	// "timer" increases degree by one each time and controls the speed.
    var degree = 0, timer;
    rotating();
    function rotating() {
        $("#test").css({ WebkitTransform: 'rotate(' + degree + 'deg)'});  
        $("#test").css({ '-moz-transform': 'rotate(' + degree + 'deg)'});                      
        timer = setTimeout(function() {
            ++degree; rotating(); },75);
    	}


