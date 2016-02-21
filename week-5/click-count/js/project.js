var count = 0;

document.body.onclick = countIt;

function countIt() {
	/*count = count + 1;*/
	count++;
	document.getElementById("number").innerHTML = count;
	
/*	if (count == 1) {
		document.getElementById("plural").innerHTML = "click";
	}
	else if (count == 20) {
		document.getElementById("clickme").innerHTML = "Congrats! You've counted to 20!";
	}
	else if (count > 5) {
		document.body.style.backgroundColor = "#ee2222";
	}
	else {
		document.getElementById("plural").innerHTML = "clicks";
	}*/

	if (count == 2) {
		document.body.style.backgroundColor = "red";
	}
	else if (count == 3) {
		document.body.style.backgroundColor = "blue";
	}
	else if (count > 6) {
		document.body.style.backgroundColor = "orange";
	}
	else if (count < 10) {
		document.body.style.backgroundColor = "yellow";
	}
	else {
		document.body.style.backgroundColor = "black";
	}
}




