$(document).ready(function() {
	var RunningTotal = 0;
	var GrandTotal = 0;

	$(".white").click(function(){
		var num = $(this).val();
		var num = $(this).text(); 
		$(".answerbox").html(num);
	});

	$("#C").click(function(){
		$(".answerbox").html("0");
	});


	
});