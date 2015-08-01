/*var hometown1
var partner1
var numkids1
var jobTitle1
var clickme1
var result


document.getElementById("clickme").onclick = answer;

function answer() {
	hometown1 = document.getElementById("hometown").value;
	partner1 = document.getElementById("partner").value;
	numkids1 = document.getElementById("numKids").value;
	jobTitle1 = document.getElementById("jobTitle").value;
	result = "You will be a "+jobTitle1+" in "+hometown1+" , and married to + "partner1"" ;
	document.getElementById("wrapper").innerHTML = result;
}*/


document.getElementById("clickme").onclick = function() {
	document.getElementById("wrapper").innerHTML = "You will be a "+document.getElementById("jobTitle").value+" in "+document.getElementById("hometown").value;+" , and married to + "document.getElementById("partner").value"";
}