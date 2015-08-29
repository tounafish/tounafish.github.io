$(document).ready(function() {

	var qwer={
		"a0":"a",
		"a1":"b",
		"a2":"c",
		"a3":"d"
	}
	
setTimeout(function(){
	var div = document.getElementsByTagName('div');
	for(i=0;i<div.length;i++){
		var index = "a"+Math.floor(Math.random()*4);
		div[i].className=qwer[index];
	}
},1000)
   	

   
	
});