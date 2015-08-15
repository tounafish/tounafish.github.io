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
	        if (num == 0) {
	        	$("#sunny").css("left", "0px").css("top", "91px");
	        	$("#sunny").css("margin-left", "550px");
	        	$("#sunny").animate({ top: "350px" }, 1000).animate({ top: "600px" }, 2000);
	    	} else if (num == 1) {
	    		$("#sunny").css("left", "0px").css("top", "91px");
	        	$("#sunny").css("margin-left", "180px");
	        	$("#sunny").animate({ top: "65%" }, 1000).animate({ left: "100%" }, 1000);
	 		} else if (num == 2) {
	 			$("#sunny").css("left", "0px").css("top", "91px");
	        	$("#sunny").css("margin-left", "800px");
	        	$("#sunny").animate({ top: "65px", left: "400px" }, 1000).animate({ top: "10%" }, 1000);
	        } else if (num == 3) {
	        	$("#sunny").css("left", "0px").css("top", "91px");
	        	$("#sunny").css("margin-left", "666px");
	        	$("#sunny").animate({ top: "65%" }, 1000).animate({ top: "10%" }, 1000);
	        } else if (num == 4) {
	        	$("#sunny").css("left", "0px").css("top", "91px");
	        	$("#sunny").css("margin-left", "770px");
	        	$("#sunny").animate({ top: "65%" }, 1000).animate({ top: "10%" }, 1000);
	        } else if (num == 5) {
	        	$("#sunny").css("left", "0px").css("top", "91px");
	        	$("#sunny").css("margin-left", "90px");
	        	$("#sunny").animate({ top: "65%" }, 1000).animate({ top: "10%" }, 1000);
	        } else if (num == 6) {
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


