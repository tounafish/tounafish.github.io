$(document).ready(function() {
	$("s0").text(tristate);
	$("s1").text(stock);
	$("s2").text(holiday);
	$("s3").text(hours);
	$("s4").text(days);
	$("s5").text(pickup);
	$("s6").text(viewable);

	$(".change-color").click(function(){
		$("#white").css("background-color"), $(this).attr("id"));
		if ($(this).attr("id") == "white") {
			$("#white").html(0);
		}

	function tristate {
		$("")
		even or odd selector
	}

	function stock {
		4 items
	}

	function holiday {
		even or odd selector
	}

	function hours {
		even or odd selector
	}

	function days {
		even or odd selector
	}

	function pickup {
		even or odd selector
		also write FreeStorePickUp
	}

	function viewable {
		even or odd selector
	}

};