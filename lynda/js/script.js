/*script.js*/
$("document").ready(function() {
	/*$("body").append("<p>The page just loaded!</p>");*/
	//$("p").css("border", "3px solid red");
	//$("p").load("css/reset.html");
	$("#restaurants li[data-type='veg']").append(" (v)");

/*
$("selector:filter").property/event("attribute/class/id", "the change");
$("tag:not(class)").property("attribute", "change");

var thing1 = $("<tag>");
newP.append("<em>something</em>");
$("#id").html(newP);
$("selector").append("change");
$("change").appendTo("selector");
$("selector").prepend("change");
$("change").prependTo("selector");
$("selector").before("change");
$("change").insertBefore("selector");
$("selector").after("change");
$("change").insertAfter("selector");


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
$("selector:tag/attr").
$("selector:has(selector[class=name])"). 

$("selectorparent selectorchild"). 
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

//var pasteimage = $(".pasteurl").value();
//$("#blowupbox").src(pasteimage);


Altering Content
$("selector").wrap(new tag is wrapped around selector);
$("selector").wrapAll(new tag is wrapped around parent of selector);
  i.e $("#example p").wrapAll("<div class='newstyle'/>");
$("selector, selector").empty();
$("selector").remove();
$("selector").detach();
$("change").replaceAll("#example tag[id]");
$("change").replaceWith();
$("selector").replaceWith(replacementFn);


$("selector").attr("attribute");
$("selector").attr("attribute", "value to set");
//$("selector").attr({ attribute: "thing1", attribute: "thing2" });
$("selector").removeAttr("attribute");

CSS
.css()
hasClass(className)
addClass()
removeClass(className)
toggleClass(className)
//$("selector").height("value");
//$("selector").width("value");
$("selector").innerHeight("value");
$("selector").outerHeight("value");
$("selector").innerWidth("value");
$("selector").outerWidth("value");
$("selector").offset().top("value");
$("selector").offset().left("value");
$("selector").position().top("value");
$("selector").position().left("value");

ANIMATION
$("selector").show("value");
$("selector").hide("value");
$("selector").toggle(duration, "swing/linear", completion);
   function completion {
	$(this).property("");
   }
$("selector").fadeIn("normal/slow/fast", opacity);
$("selector").fadeOut();
$("selector").fadeTo();
$("puslate").fadeTo(300, 0.3)
			 .fadeTo(300, 1.0)
			 .fadeTo(300, 0.3)
			 .fadeTo(300, 1.0);			 
$("selector").slideUp("normal/slow/fast", "swing/linear");
$("selector").slideDown("normal/slow/fast", "swing/linear");
$("selector").slideToggle("normal/slow/fast", "swing/linear");
console.log(this.property); writes to Console of dev tools
$("selector").animate({ property: "value", property: "value" }, duration, easing, complete);
  					 ({ property: "value" }, ms/slow/fast, swing/linear);
$("selector").animate(property, parameters);



NOTES from class Week 8
StartUp Review
width:auto

css
#page-header nav{
	display: none;
	padding-top:0;
	padding-bottom: 1 em;
	width: auto;
	float: none;
	text align: center;
	clear: both;
}

#page-header nav a {
	display:block;
	border-bottom: 1px solid #ccc;
}

$(document).ready(function(){
	$("#mobile").click(function(){
		$("#page-header nav").toggle();
		or
		$("#page-header nav").slideToggle(1000);
		or
		$("#page-header nav").fadeToggle(1000);
	});
});

$(window).resize(function(){
	if($(window).width() > 768) {
		$("#page-header nav").show();
	}
	else {
		$("page-header nav").hide();
	}

	or

	if($(window).width() > 768) {
		$("page-header nav").attr("style", "");
	}

});


overflow-x: hidden

if($("body").css("right") == "100px") {
	}
	else

	www.lorempixel.com
	parralax

POSITIONS
position: static; default, stacks
position: fixed; stays in place in window (top, bottom, left, right)
position: relative; can use Z index, moves object around the same position (top, bottom, left, right)
position: absolute; 



VIDEO TAG












*/
});