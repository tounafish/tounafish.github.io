/*script.js*/
$("document").ready(function() {
	/*$("body").append("<p>The page just loaded!</p>");*/
	//$("p").css("border", "3px solid red");
	//$("p").load("css/reset.html");
	$("#restaurants li:has(p[class=veg]").append("(Veg)");

/*
$("selector:filter").property/event("attribute/class/id", "the change");
$("tag:not(class)").property("attribute", "change");

var thing1 = $("<tag>");
newP.append("<em>something</em>");
$("#id").html(newP);
$("#id").prepend("Watch This! ");
$("#id").html("<tag>WTF</tag>");
$("#id").text("<tag>WTF</tag>");
$("#id").load("web.html");

$("#id").on(event)

$("selector[class]").  selector with any kid of class
$("selector[class=name]").  selector with this class name
$("selector[class^=beginswith]"). selector with class that name begins with this string of letters
$("selector[class^=beginswith][lang*=en-]"). contains (*=)
$("selector:contains('X')"). the text inside selector contains X
$("selector:parent"). 
$("selector:has(selector[class=name])"). 

$("selectorparent selectorchild:first-child"). 
$("selectorparent selectorchild:last-of-type"). 
$("selectorparent selectorchild:nth-child(3)"). 
$("selectorparent selectorchild:nth-child(2n)"). selects multiples of 2


$("selector").children().property("attribute/class/id", "the change")

var elem = $("selector")
elem.prev().property(something)
elem.next().property(something)
elem.parents().property(something)
elem.parentsUntil($("tag")).property(something)


$("selector").find("selector").property

var leftmargin=0;
var border=3;
$("#id selector").each(function(index, element) {
	$(element).property("border", border+"px solid red")
			  .property("margin-left", leftmargin);
	border += 2;
	leftmargin += 10;
});



$("selector").fn1().fn2().fn3()
















*/
});