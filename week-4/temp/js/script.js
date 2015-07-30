var fahr; 
var cels;
var inputC;
var inputF;
var answerC;
var answerF;
var zero = null;

document.getElementById("go1").onclick = calculateTempC;

function calculateTempC() {
	cels = document.getElementById("inputC").value;
	fahr = document.getElementById("inputF").value;
	var inputC = cels;
	answerC = ((cels * 9) / 5) + 32;
	document.getElementById("xans").innerHTML = zero;
	document.getElementById("yans").innerHTML = zero;
	document.getElementById("xans").innerHTML = inputC + "&#8451;";
	document.getElementById("yans").innerHTML = answerC + "&#8457";
}

document.getElementById("go2").onclick = calculateTempF;

function calculateTempF() {
	cels = document.getElementById("inputC").value;
	fahr = document.getElementById("inputF").value;
	var inputF = fahr;
	answerF = ((fahr - 32) * 5) / 9;
	/* ((fahr - 32) * 5) / 9*/
	document.getElementById("xans").innerHTML = zero;
	document.getElementById("yans").innerHTML = zero;
	document.getElementById("xans").innerHTML = inputF + "&#8457";
	document.getElementById("yans").innerHTML = answerF + "&#8451;";
}
