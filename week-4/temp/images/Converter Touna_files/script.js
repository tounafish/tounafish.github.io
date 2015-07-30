var fahr; 
var maxAge;
var drink;
var numPerDay;

document.getElementById("clickme").onclick = calculateTotal;

function calculateTotal() {
	age = document.getElementById("fahr").value;
	maxAge = document.getElementById("cels").value;
	drink = document.getElementById("drink").value;
	numPerDay = document.getElementById("numPerDay").value;

	var totalDrink = (maxAge - age) * 365 * numPerDay;
	document.getElementById("totalDrink").innerHTML = totalDrink;
	document.getElementById("whichDrink").innerHTML = drink;
}

document.getElementById("blue").onclick = coldBlue;

function coldBlue() {
  document.getElementById("all").style.color = "white";
  document.getElementById("all").style.backgroundColor = "blue";
}

document.getElementById("red").onclick = hotRed;

function hotRed() {
  document.getElementById("all").style.color = "yellow";
  document.getElementById("all").style.backgroundColor = "red";
}

document.getElementById("gray").onclick = netGray;

function netGray() {
  document.getElementById("all").style.color = "orange";
  document.getElementById("all").style.backgroundColor = "gray";
}
