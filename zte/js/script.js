$(document).ready(function() {
	/*change phone image*/

	$("#box1").on("mouseover", function() {
		$("#phone2").removeClass("visible").addClass('hidden');$("#phone1").removeClass("hidden").addClass("visible");
		$("#box2, #box3, #box4, #box5").removeClass("desc-box-hover").addClass('desc-box');$("#box1").removeClass("desc-box").addClass("desc-box-hover");
	});

	$("#box2").on("mouseover", function() {
		$("#phone1").removeClass("visible").addClass('hidden');$("#phone2").removeClass("hidden").addClass("visible");
		$("#box1, #box3, #box4, #box5").removeClass("desc-box-hover").addClass('desc-box');$("#box2").removeClass("desc-box").addClass("desc-box-hover");
	});

	$("#box3").on("mouseover", function() {
		$("#phone4, #phone5").removeClass("visible").addClass('hidden');$("#phone3").removeClass("hidden").addClass("visible");
		$("#box1, #box2, #box4, #box5").removeClass("desc-box-hover").addClass('desc-box');$("#box3").removeClass("desc-box").addClass("desc-box-hover");
	});

	$("#box4").on("mouseover", function() {
		$("#phone3, #phone5").removeClass("visible").addClass('hidden');$("#phone4").removeClass("hidden").addClass("visible");
		$("#box1, #box2, #box3, #box5").removeClass("desc-box-hover").addClass('desc-box');$("#box4").removeClass("desc-box").addClass("desc-box-hover");
	});

	$("#box5").on("mouseover", function() {
		$("#phone3, #phone4").removeClass("visible").addClass('hidden');$("#phone5").removeClass("hidden").addClass("visible");
		$("#box1, #box2, #box3, #box4").removeClass("desc-box-hover").addClass('desc-box');$("#box5").removeClass("desc-box").addClass("desc-box-hover");
	});



	/*play video*/
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

