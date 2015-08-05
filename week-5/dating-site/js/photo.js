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
	document.getElementById("qwe").src = "images/darth-vader-look-up_b.jpg";
}

function kitten() {
	document.getElementById("qwe").src = "images/darth-vader-kitten_b.jpg";
}

function atwork () {
	document.getElementById("qwe").src = "images/darth-vader-atwork_b.jpg";
}

function proof() {
	document.getElementById("qwe").src = "images/darth-vader-proof_b.jpg";
}

function lightsaber() {
	document.getElementById("qwe").src = "images/darth-vader-lightsaber_b.jpg";
}

function thinner() {
	document.getElementById("qwe").src = "images/darth-vader-thinner_b.jpg";
}

function dog() {
	document.getElementById("qwe").src = "images/darth-vader-dog_b.jpg";
}

function hellokitty() {
	document.getElementById("qwe").src = "images/darth-vader-hello-kitty_b.jpg";
}

function tiefighter() {
	document.getElementById("qwe").src = "images/darth-vaders-tie-fighter_b.jpg";
}

function deathstar() {
	document.getElementById("qwe").src = "images/death-star_b.jpg";
}

function daughter() {
	document.getElementById("qwe").src = "images/daughter_b.jpg";
}

function son() {
	document.getElementById("qwe").src = "images/son_b.jpg";
}


