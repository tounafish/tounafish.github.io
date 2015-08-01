document.getElementById("clickme").onclick = function() {
	var name = document.getElementById("name").value;
	var grade = document.getElementById("grade").value;
	var listitem = "";

	if(grade > 90) {
		grade = "A";
	}
	else if(grade > 80) {
		grade = "B";
	}
	else if(grade > 70) {
		grade = "C";		
	}
	else if(grade > 60) {
		grade = "D";
	}
	else {
		grade = "F";
	}
	listitem = "<li>"+name+" got a "+grade+"</li>";
	document.getElementById("reportcard").innerHTML = document.getElementById("reportcard").innerHTML + listitem;
};

document.getElementById("name").onfocus = function () {
	document.getElementById("name").value = null;
}

document.getElementById("grade").onfocus = function () {
	document.getElementById("grade").value = null;
}