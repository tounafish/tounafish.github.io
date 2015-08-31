$(document).ready(function() {
	var boxwidth = 0;
	var boxlength = 0;
	var boxsize = $(".boxsize").attr("width");
	var boxdiv = $("div").length();

	for (i = 4; i < boxdiv; i++) {
		var index = "b"+Math.floor(".boxsize"++1);
		if boxwidth < 525 {
			$("b"+[i]).attr("backgroundPosition", boxwidth++75);
		}
		else {
			boxlength = boxlength++75;
			boxwidth = 0;
		}
	
	});
};


/*
 
	var qwer={
		"a0":"a",
		"a1":"b",
		"a2":"c",
		"a3":"d"
	}

	setTimeout(function(){
		var img = document.getElementsByTagName('img');
		for(i=0;i<img.length;i++){
			var index = "a"+Math.floor(Math.random()*4);
			img[i].className=qwer[index];
		}
	}, 800)
   	

document.getElementById("boxsize").attr("backgroundPosition", (boxwidth++75))*/


