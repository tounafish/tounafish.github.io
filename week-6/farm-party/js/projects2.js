$( document ).ready(function() {
	$(".moveit").hover(move);
	});

	function move() {
		$(this).animate({ "top": "100%", "left": "100%" }, 2000);
	};
