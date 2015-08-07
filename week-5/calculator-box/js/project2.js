1/*
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

var num1=1;
var num2=2;
var num3=3;
var num4=4;
var num5=5;
var num6=6;
var num7=7;
var num8=8;
var num9=9;
var num0=0;
var out=0;
var total;

document.getElementById("clear").onclick = reset;
document.getElementById("a1").onclick = a1r;
document.getElementById("a2").onclick = a2r;
document.getElementById("a3").onclick = a3r;
document.getElementById("a4").onclick = a4r;
document.getElementById("a5").onclick = a5r;
document.getElementById("a6").onclick = a6r;
document.getElementById("a7").onclick = a7r;
document.getElementById("a8").onclick = a8r;
document.getElementById("a9").onclick = a9r;
document.getElementById("a0").onclick = a0r;

function a1r() {
	document.getElementById("out").innerHTML = out += num1;	
}

function a2r() {
	document.getElementById("out").innerHTML = out += num2;
}

function a3r() {
	document.getElementById("out").innerHTML = out += num3;
}

function a4r() {
	document.getElementById("out").innerHTML = out += num4;
}

function a5r() {
	document.getElementById("out").innerHTML = out += num5;
}

function a6r() {
	document.getElementById("out").innerHTML = out += num6;
}

function a7r() {
	document.getElementById("out").innerHTML = out += num7;
}

function a8r() {
		document.getElementById("out").innerHTML = out += num8;
}

function a9r() {
		document.getElementById("out").innerHTML = out += num9;
}

function a0r() {
		document.getElementById("out").innerHTML = out += num0;
}

function reset() {
	document.getElementById("out").innerHTML = "0";
	total == 0;
}

