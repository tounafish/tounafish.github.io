function test(){
	setTimeout(function(){
		window.location.href = "pickimage.html";
	}, 3500)
};

$(document).ready(function () {
/*	   $("div.hidden").fadeIn(3000, function(){
	    $("div.letter").animate({
		    "top": "100%", 
		    "left": "100%"
		  }, 200);
    }).removeClass("hidden");

    $("div h1").fadeOut(6000);*/

	var qwer=["a","b","c","d","e"];

	setTimeout(function(){
		var img = document.getElementsByTagName('img');
		for(i=0;i<img.length;i++){
			var index = Math.floor(Math.random()*5);
			img[i].className=qwer[index];
		}
		test();
	}, 900)


	
});