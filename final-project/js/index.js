$(document).ready(function () {
/*	   $("div.hidden").fadeIn(3000, function(){
	    $("div.letter").animate({
		    "top": "100%", 
		    "left": "100%"
		  }, 200);
    }).removeClass("hidden");

    $("div h1").fadeOut(6000);*/

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
   	

   
});