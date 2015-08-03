var age;
var maxAge;
var drink;
var numPerDay;

document.getElementById("clickme").onclick = calculateTotal;
function calculateTotal () {
	age = document.getElementById("age").value;
	maxAge = document.getElementById("maxAge").value;
	drink = document.getElementById("drink").value;
	numPerDay = document.getElementById("numPerDay").value;

	
	document.getElementById("emailsent").innerHTML = "<h2>EMAIL SENT</h2>"+"<br>"+age+"<br>"+maxAge+"<br>"+drinks+"<br>"+numPerDay;
}