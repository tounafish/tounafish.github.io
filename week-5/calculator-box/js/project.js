/*
When each box is clicked the total is added or 
subtracted from the middle box. 

Ideas on how to make it work:
1. Each div needs an id.
2. A value is assigned to that id
3. Onclick that value is captured
4. That value is added/subtracted to the id=out.
5. The HTML is replaced.
	1. When "a10" is clicked, +10 is added to "out".
	2. When "a20" is clicked, +20 is added to "out".
	3. When "a30" is clicked, +30 is added to "out".
	4. When "n10" is clicked, -10 is added to "out".
	5. When "n20" is clicked, -20 is added to "out".
	6. When "n30" is clicked, -30 is added to "out".
	7. When "red" is clicked, the background of "out"
	   becomes red.
	8. When "blue" is clicked, the background of "out"
	   becomes blue.
	9. When "out"  is clicked, it resets value to zero.
*/

var num10=10;
var num20=20;
var num30=30;
var out=0;
var red;
var blue;
var total;

document.getElementById("out").onclick = reset;
document.getElementById("a10").onclick = a10r;
document.getElementById("a20").onclick = a20r;
document.getElementById("a30").onclick = a30r;
document.getElementById("n10").onclick = n10r;
document.getElementById("n20").onclick = n20r;
document.getElementById("n30").onclick = n30r;
document.getElementById("blue").onclick = bluer;
document.getElementById("red").onclick = redr;

function a10r() {
	document.getElementById("out").innerHTML = out + num10;
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

function n20r() {
	document.getElementById("out").innerHTML = out - num20;
}

function n30r() {
	document.getElementById("out").innerHTML = out - num30;
}

function redr() {
	document.getElementById("out").style.background = "red";
	document.getElementById("out").style.color = "white";

}

function bluer() {
	document.getElementById("out").style.background = "blue";
	document.getElementById("out").style.color = "white";

}

function reset() {
	document.getElementById("out").innerHTML = "0";
	document.getElementById("out").style.background = "white";
	document.getElementById("out").style.color = "black";

}

/*
document.getElementById("submit").onclick = runningtotal;
  
function runningtotal() {
	var num10=10;
	var num20=20;
	var num30=30;
	var out=0;
	var red;
	var blue;
	var total;
  	createStudent(name, grade, seat);
}

function createStudent(n, g, s) {
  if(num10 == 10) {
     document.body.innerHTML = document.body.innerHTML+"<h2>The teacher is:</h2>";
  }
  else {
    document.body.innerHTML = document.body.innerHTML+"<h2>The current student is:</h2>";
  }
   document.body.innerHTML = document.body.innerHTML+"<p>Name: "+n+"</p>";
  
  if (g < 2) {
    document.body.innerHTML = document.body.innerHTML+"<p class=\"failing\">Grade: "+g+"</p>";    
  }
  else {
    document.body.innerHTML = document.body.innerHTML+"<p>Grade: "+g+"</p>";
  }
  document.body.innerHTML = document.body.innerHTML+"<p>Seat Assignment: "+s+"</p>";
}
*/

