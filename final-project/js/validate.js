$(document).ready(function() {
	$("formID").submit(function(evt){
		evt.preventDefault(); //doesn't do the default action//
		if($("#username").val() != "jpg") {
			alert("Not an image");
			$("#username").css("background-color", "#fff");
		}
});

	$("formID").focus (function(){
		$(this).val("");
		$(this).attr("style", "");
	});

	$("input").blur(function(){
		if($(this).val() == "") {
			alert("All fields are required");
		}
	});

});
