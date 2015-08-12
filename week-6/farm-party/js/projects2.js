$( document ).ready(function() {
	$(".moveit").hover(move);
	$("div[id]").click(backgrounde);
	});

	function backgrounde(){
		$(this).removeClass("display");
	};
	function move() {
		$(this).animate({ "top": "0", "left": "1600px" }, 2000, complete);
	};

	function complete(){
		$(this).animate({ "top": "0", "left": "0" }, 0);
	};

