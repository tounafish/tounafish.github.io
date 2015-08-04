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

var a10 = 10;
var a20 = 20;
var a30 = 30;
var n10 = -10;
var n20 = -20;
var n30 = -30;
var out;
var red;
var blue;

document.getElementById("out").onclick = result;

function result() {
	a10 = document.getElementById("a10").value;
	a20 = document.getElementById("a20").value;
	a30 = document.getElementById("a30").value;
	n10 = document.getElementById("n10").value;
	n20 = document.getElementById("n20").value;
	n30 = document.getElementById("n30").value;



}




