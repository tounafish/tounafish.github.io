$( document ).ready(function() {
	$(".moveit").hover(move);
	$("button[id]").click(backgrounde);
	});

	function backgrounde() {
		$("img[id]").toggle("swing");
		$("div.fixed").removeClass("display");
	};

	function move() {
		$(this).animate({ "top": "0", "left": "1600px" }, 2000, complete);
	};

	function complete(){
		$(this).animate({ "top": "0", "left": "0" }, 0);
	};

