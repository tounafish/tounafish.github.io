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
	}

	function move() {
		$(this).animate({ left: "100%" }, 2000);
	}

	function complete() {
		$(this).animate({ left: "100%" }, 0);
	}

	function sunmove() {
		$("#sunny").animate({ top: "100%" }, 4000)
				   .animate({ top: "70px" }, 400);
	}