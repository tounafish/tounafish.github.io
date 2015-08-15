$( document ).ready(function() {
/*	$(".moveit").mouseover(move);
	$(".moveit").mouseleave(complete);*/
	$("button[class]").click(backgrounde);
	$("#sunny").mouseover(sunmove);
	});


	function backgrounde() {
		var num = $(this).index();
		$(".fixeded").addClass("hide");
		$("#back" + num).removeClass("hide");
	        if (num == 0) /*farm*/ {
	        	$("#sunny").css("left", "0px").css("top", "91px");
	        	$("#sunny").css("margin-left", "550px");
	        	$("#sunny").animate({ top: "350px" }, 1000).animate({ top: "600px" }, 2000);
	    	} else if (num == 1) /*ocean*/ {
	    		$("#sunny").css("left", "81px").css("top", "91px");
	        	
	        	$("#sunny").animate({ top: "500px" }, 1000).animate({ left: "100%" }, 1000);
	 		} else if (num == 2) /*space*/ {
	 			$("#sunny").css("left", "0px").css("top", "91px");
	        	$("#sunny").animate({ top: "480px", left: "1150px" }, 500)
	        				.animate({ top: "300px", left: "1000px" }, 500)
	        				.animate({ top: "280px", left: "900px" }, 500);
	        } else if (num == 3) /*miley*/ {
	        	$("#sunny").css("left", "650px").css("top", "91px");
	        	$("#sunny").animate({ top: "420px" }, 2000);
	        } else if (num == 4) /*bobross*/ {
	        	$("#sunny").css("left", "0px").css("top", "91px");
	        	$("#sunny").css("margin-left", "570px");
	        	$("#sunny").animate({ top: "65%" }, 1000).animate({ top: "10%" }, 1000);
	        } else if (num == 5) /*bomb*/ {
	        	$("#sunny").css("left", "35px").css("top", "150px");
	        	$("#sunny").animate({ top: "90%" }, 100).animate({ left: "90%" }, 100).animate({ top: "0%" }, 100).animate({ left: "00%" }, 100);
	        } else if (num == 6) /*speedracer*/ {
	        	$("#sunny").css("left", "0px").css("top", "91px");
	        	$("#sunny").css("margin-left", "900px");
	        	$("#sunny").animate({ top: "65%" }, 1000).animate({ top: "10%" }, 1000);
	        } else {
	        	$("#sunny").css("left", "0px").css("top", "91px");
	        	$("#sunny").css("margin-left", "200px");
	        	$("#sunny").animate({ top: "65%" }, 1000).animate({ top: "10%" }, 1000);		
		}
	}

/*	function move() {
		$(this).animate({ left: "100%" }, 1500);
	}

	function complete() {
		$(this).animate({ left: "100%" }, 0);
	}

	function sunmove() {
		$("#sunny").animate({ top: "65%" }, 1000).animate({ top: "10%" }, 1000);
	}

		function sunmove() {
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


