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

	var totalDrink = (maxAge - age) * 365 * numPerDay;
	document.getElementById("totalDrink").innerHTML = totalDrink;
	document.getElementById("whichDrink").innerHTML = drink;
}