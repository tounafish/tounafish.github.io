$( document ).ready(function() {
	$(".moveit").mouseover(move);
	$(".moveit").mouseleave(complete)
	$("button[id]").click(backgrounde);
	});

	function backgrounde() {
		$("img[id]").toggle("swing");
		$("div.fixed").removeClass("display");
	};

	function move() {
		$(this).animate({ "top": "0%", "left": "100%" }, 2000);
	};

	function complete(){
		$(this).animate({ "right": "100%" }, 0);
	};

