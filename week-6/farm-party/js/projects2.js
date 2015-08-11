$( document ).ready(function() {
	$(".moveit").hover(move);
	});

	function move() {
		$(this).animate({ "top": "90%", "left": "90%" }, 2000, complete);
	};

	function complete(){
		$(this).animate({ "top": "0%", "left": "0%" }, 100);
};
