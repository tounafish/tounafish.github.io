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

var num10=10;
var num20=20;
var num30=30;
var out=0;
var red;
var blue;
var total;

document.getElementById("lookup").onclick = reset;
document.getElementById("kitten").onclick = a10r;
document.getElementById("proof").onclick = a20r;
document.getElementById("lightsaber").onclick = a30r;
document.getElementById("thinner").onclick = n10r;
document.getElementById("dog").onclick = n20r;
document.getElementById("hellokitty").onclick = n30r;
document.getElementById("tiefighter").onclick = bluer;
document.getElementById("deathstar").onclick = redr;
document.getElementById("daughter").onclick = redr;
document.getElementById("son").onclick = redr;





function a10r() {
	document.getElementById("right").image = 
}

function a20r() {
	document.getElementById("out").innerHTML = out + num20;
}

function a30r() {
	document.getElementById("out").innerHTML = out + num30;
}

function n10r() {
	document.getElementById("out").innerHTML = out - num10;
}
