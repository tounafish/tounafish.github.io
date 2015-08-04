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

var a10;
var a20;
var a30;
var n10;
var n20;
var n30;
var out;
var red;
var blue;

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
	a10 = 10;
	a20 = 20;
	a30 = 30;
	n10 = -10;
	n20 = -20;
	n30 = -30;
	if (document.getElementById("a10").onclick){
		total = out + a10;
	}
	else if {
		document.getElementById("a20").onclick = out + a20;
	}
	else if {
		document.getElementById("a30").onclick = out + a30;
	}
	else if {
		document.getElementById("n10").onclick = out + n10;
	}
	else if {
		document.getElementById("n20").onclick = out + n20;
	}
	else if {
		document.getElementById("n30").onclick = out + n30;
	}
	else if {
		document.getElementById("blue").onclick = document.style.background ("#444");
	}
	else if {
		document.getElementById("red").onclick = document.style.background ("#aaa");
	}
	else {
		document.getElementById("out").onclick = null;
	}
	document.getElementById("out").innerHTML = total;
}


/*
document.getElementById("submit").onclick = addStudent;
  
function addStudent() {
  var name = document.getElementById("name").value;
  var grade = document.getElementById("grade").value;
  var seat = document.getElementById("seat").value;
  createStudent(name, grade, seat);
}

function createStudent(n, g, s) {
  if(n == "Joe Bliss") {
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

