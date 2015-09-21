$(document).ready(function() {
	var RunningTotal = 0;
	var GrandTotal = 0;
	var subtotal = false;
	var x;

	$(".white").click(function(){
		/*var num = $(this).val();*/
		if(!subtotal){
			var num = $(this).text(); 
			if($(".answerbox").html()==0){
				$(".answerbox").html(num);
			}else{
				$(".answerbox").html($(".answerbox").html()+num);
			}
		}else if(subtotal){
			var num = $(this).text(); 
			if($(".answerbox").html()==0){
				$(".answerbox").html(num);
			}else{
				$(".answerbox").html($(".answerbox").html()+num);
			}
		}
		
	});

	$(".orange").click(function(){
		subtotal=true;
		x=$('.answerbox').html();
		$('.answerbox').html('');

	});



	$("#C").click(function(){
		$(".answerbox").html("0");
	});


	
});