$( document ).ready(function() {
	$(".moveit").hover(move);
	});

	function move() {
		$(this).animate({
    "height": "70px", 
    "width": "20px"
  }, 200); 
	};

