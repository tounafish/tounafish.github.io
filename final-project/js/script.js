/*
Goals of the javascript and ideas on how to do it:

1. Amount of Dynamite
	a. User will be prompted to enter any number to 
	indicte how much dynamite they would want to use.
	b. If the number is too high, it would case the site
	to break
	c. If it a reseasonable number, it will take that
	value and change the speed of the animation accordingly
	
	Ideas on How to Do It:
		a. An input field with an id
		b. Validate if it's a number or not
		c. A button to trigger the capture of the number
		d. A jquery line to get value of input field
		e. a var to equal that value
		f. take that value and multiple the preset duration
		   of animation


2. Image link
	a. User will be able to paste an url link to any image
	b. If the value is not an image, an error message would
		be delivered that it was not an image
	c. If the value is an image, than it would take the value
		of the user's paste, and convert it to the background
		image of a preset div
	d. If image is not the right size or shape, hmm... not sure.
		
	Ideas on How to Do It:
		a. An input field with an id
		b. Validate if it's an image by looking for the words
			".jpg" or ".png"
		c. 















*/


$( document ).ready(function() {
	$("button").click(function(){
		var pasteimage = $("#userpaste").val(jack)
	};

	function jack {
		$("#blowupbox").src(pasteimage);
	};
});
		
