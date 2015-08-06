/* If you click on any thumbnail image on 
the left, it would be display large on the
right.   

Ideas on how to do this:
1. Every img tag in "lefty" gets an id
2. That id is given an onclick event
3. The onclick event targets image 
   replacement in "righty" with new
   url link to an image.
*/


document.getElementById("lookup").onclick = lookup;
document.getElementById("kitten").onclick = kitten;
document.getElementById("atwork").onclick = atwork;
document.getElementById("proof").onclick = proof;
document.getElementById("lightsaber").onclick = lightsaber;
document.getElementById("thinner").onclick = thinner;
document.getElementById("dog").onclick = dog;
document.getElementById("hellokitty").onclick = hellokitty;
document.getElementById("tiefighter").onclick = tiefighter;
document.getElementById("deathstar").onclick = deathstar;
document.getElementById("daughter").onclick = daughter;
document.getElementById("son").onclick = son;



function lookup() {
	document.getElementById("caption").innerHTML = "<h3>This is my good side.</h3>";
	document.getElementById("qwe").src = "images/darth-vader-look-up_b.jpg";
}

function kitten() {
	document.getElementById("caption").innerHTML = "<h3>When I think about all the cats without a home, I cry.</h3>";
	document.getElementById("qwe").src = "images/darth-vader-kitten_b.jpg";
}

function atwork () {
	document.getElementById("caption").innerHTML = "<h3>My boss and I at a work convention.</h3>";
	document.getElementById("qwe").src = "images/darth-vader-atwork_b.jpg";
}

function proof() {
	document.getElementById("caption").innerHTML = "<h3>I've always loved this shot of me.</h3>";
	document.getElementById("qwe").src = "images/darth-vader-proof_b.jpg";
}

function lightsaber() {
	document.getElementById("caption").innerHTML = "<h3>I'm a licensed Jedi master. I hope to open my own studio one day to teach others.</h3>";
	document.getElementById("qwe").src = "images/darth-vader-lightsaber_b.jpg";
}

function thinner() {
	document.getElementById("caption").innerHTML = "<h3>A shot of me from high school.</h3>";
	document.getElementById("qwe").src = "images/darth-vader-thinner_b.jpg";
}

function dog() {
	document.getElementById("caption").innerHTML = "<h3>I am tolerant of dogs.</h3>";
	document.getElementById("qwe").src = "images/darth-vader-dog_b.jpg";
}

function hellokitty() {
	document.getElementById("caption").innerHTML = "<h3>I love me in white.</h3>";
	document.getElementById("qwe").src = "images/darth-vader-hello-kitty_b.jpg";
}

function tiefighter() {
	document.getElementById("caption").innerHTML = "<h3>My ride.</h3>";
	document.getElementById("qwe").src = "images/darth-vaders-tie-fighter_b.jpg";
}

function deathstar() {
	document.getElementById("caption").innerHTML = "<h3>I believe in owning property. Here's a planet I owned until the 'Great Bang'.</h3>";
	document.getElementById("qwe").src = "images/death-star_b.jpg";
}

function daughter() {
	document.getElementById("caption").innerHTML = "<h3>My daughter. We really don't see eye to eye. She doesn't understand my lifestyle.</h3>";
	document.getElementById("qwe").src = "images/daughter_b.jpg";
}

function son() {
	document.getElementById("caption").innerHTML = "<h3>My son. I'm confident he will take over the family business.</h3>";
	document.getElementById("qwe").src = "images/son_b.jpg";
}

