document.getElementById("clickme").onclick = function() {
	document.getElementById("wrapper").innerHTML = "You will be a " + document.getElementById("jobTitle").value + " in " + document.getElementById("hometown").value + ", and married to " + document.getElementById("partner").value + " with " + document.getElementById("numKids").value + " kids";	
};

// Brute Force Approach
// var hometown;
// var partner;
// var numKids;
// var jobTitle;

// document.getElementById("clickme").onclick = getFortune;

// function getFortune() {
// 	hometown = document.getElementById("hometown").value;
// 	partner = document.getElementById("partner").value;
// 	numKids = document.getElementById("numKids").value;
// 	jobTitle = document.getElementById("jobTitle").value;

// 	var result = "You will be a " + jobTitle + " in " + hometown + ", and married to " + partner + " with " + numKids + " kids";

// 	document.getElementById("wrapper").innerHTML = result;	
// }


