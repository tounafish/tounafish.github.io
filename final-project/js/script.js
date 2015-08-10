$(document).ready(function(){
	$("button").click(function(){
		var pasteimage = $("#userpaste").value();
		$("#blowupbox").src(pasteimage);
	});
});
		
