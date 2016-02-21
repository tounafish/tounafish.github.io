document.getElementById("clickme").onclick = function(){
	var name = document.getElementById("name").value;
	var grade = document.getElementById("grade").value;
	var listItem = "";

	if(grade > 90) {
		// A
		grade = "A";
	}
	else if(grade > 80) {
		//B
		grade = "B";
	}
	else if (grade > 70) {
		//C
		grade = "C";
	}
	else if (grade > 60){ 
		//D
		grade = "D";
	}
	else {
		//F
		grade = "F";
	}
	listItem = "<li>"+name+" got a "+grade+"</li>";
	document.getElementById("reportcard").innerHTML = document.getElementById("reportcard").innerHTML + listItem;
};

document.getElementById("name").onfocus = function(){
	document.getElementById("name").value = "";
};

document.getElementById("grade").onfocus = function(){
	document.getElementById("grade").value = "";
};




