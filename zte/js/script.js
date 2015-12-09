$(document).ready(function() {
	$("#box1").on("mouseover", function() {
		$("#phone2").removeClass("visible").addClass('hidden');$("#phone1").removeClass("hidden").addClass("visible");
	});

	$("#box2").on("mouseover", function() {
		$("#phone1").removeClass("visible").addClass('hidden');$("#phone2").removeClass("hidden").addClass("visible");
	});

	$("#box3").on("mouseover", function() {
		$("#phone4, #phone5").removeClass("visible").addClass('hidden');$("#phone3").removeClass("hidden").addClass("visible");
	});

	$("#box4").on("mouseover", function() {
		$("#phone3, #phone5").removeClass("visible").addClass('hidden');$("#phone4").removeClass("hidden").addClass("visible");
	});

	$("#box5").on("mouseover", function() {
		$("#phone3, #phone4").removeClass("visible").addClass('hidden');$("#phone5").removeClass("hidden").addClass("visible");
	});
	
	var video=$('#introvideo').get(0); 
		$("#play").on("click", function(){
			video.play();
			$("#play").hide();
		});     
		
		video.addEventListener('ended',function(){
	    v=video.currentSrc;
	    video.src='';
	    video.src=v;
	    $("#play").show();            
	});

});

