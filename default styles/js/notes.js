/*notes.js
Week 6
$(--).TAG(property)

.css("property": "value", "property": "value")

$("#div").css("color"); gets value of div
$("#div").css("color", "black"); sets div to "black"
$(elem).css(["prop1", "prop2", "prop3", "prop4"]); gets 4 properties.

attributes: href, id, class, src, type
$("a").attr(href"); Returns 
$("#logo").attr(src)
$("")

HTML insertion

CSS classes
$("div").addClass("special");
$("div").removeClass("special");
$("div").toggleClass("special");
$("div").hasClass("special");


Changing CSS Exercise --> -->

Javascript:
$("a").click(function(){
	$("body").removeClass();
	$("body").addClass($(this.attr("class"));
});

CSS:
body.gray {
	color: white;
	background-color: gray;
}

body.white {
	color: black;
	background-color: white;
}

body.blue {
	color: white;
	background-color: blue;
}

body.yellow {
	color: black;
	background-color: yellow;
}

a.gray {
	background-color: white;
}

a.white {
	background-color: blue;
}

a.blue {
	background-color: yellow;
}

a.yellow {
	background-color: gray;
}

HTML:
<a class="gray" href="#">
<a class="white" href="#">
<a class="blue" href="#">
<a class="yellow" href="#">

<-- <--

*/