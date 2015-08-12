$( document ).ready(function() {
	$(".moveit").mouseover(move);
	$(".moveit").mouseleave(complete)
	$("button[id]").click(backgrounde);
	});


	function backgrounde() {
		var num = $(this).index();
		$("img").eq(num).toggle("swing");
		$("img").eq(num).elem.next().removeClass("display");
		$("img").attr("src", "images/backgrounds-assets/ocean.jpg");
	  	$("img").attr("alt", "doggy in the window");
		/*$("selector").removeAttr("attribute");*/
	};

	function move() {
		$(this).animate({ "top": "0%", "left": "100%" }, 2000);
	};

	function complete(){
		$(this).animate({ "left": "0%" }, 0);
	};