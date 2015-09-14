$(document).ready(function(){ //Begin document ready function

/*---------------------------------------------------------------MAIN---------------------------------------------------------------*/
/*---------------------------------------------------------------PAGE---------------------------------------------------------------*/
/*---------------------------------------------------------------CODE---------------------------------------------------------------*/

//click banner to go hide everything and go to upload page
$("h6 a").click(function(event){ 

	event.preventDefault();

  $("#containerLogo").hide();
  $("header").removeClass("hide");
	//$("#containerUpload").show();
  $("#carousel").show();
});

/*--------------------------------------------------------------IMAGE--------------------------------------------------------------*/
/*--------------------------------------------------------------UPLOAD-------------------------------------------------------------*/
/*---------------------------------------------------------------PAGE--------------------------------------------------------------*/


function readURL(input) {
  //test if IS file AND is FIRST position
  if (input.files && input.files[0]) {
    var reader = new FileReader ();
    //when the reader object is created (done loading) set the src to the target result
    reader.onload = function (e) {
      //reader is created now set the src to what the user just uploaded
      $("#userImage").attr("src", e.target.result); //target is the EVENT target (event as in the upload)
      $("#imgInput").hide();
      $("#instructions").hide();
      $("#bannerSmallText h4").html("GUITAR");
      $("#bannerSmallText h5").html("Change");
    }
    reader.readAsDataURL(input.files[0]);
  }
}

//change image or keep original image?
$("#imgInput").change(function() {
  //check to see if the value is not empty
  if ($("#impInput").val()!="") {
    $("#remove").show();
    $("#userImage").show("fast");
    $("#uploadButton").hide();
  }

  else {
    //remove controls, remove button, remove image, set readURL to this
    $("#remove").hide();
    $("#userImage").hide("slow");
    $("#guitarOverlay").hide();
    $("footer").hide();
  }
    
    readURL(this);
});

//remove image
$("#remove").click(function(){
  //empty input value
  $("#imgInput").val("");
  $("#imgInput").show();
  //hide remove button
  $(this).hide();
  //hide image 
  $("#userImage").attr("src", "");
  $("#userImage").hide("slow");
  $("#guitarOverlay").removeAttr("class");
  $("#guitarOverlay").removeAttr("style");
  $("#guitarOverlay").hide();
  $("#containerGuitarNav").attr("class", "navPik"); 
  $("#bannerSmallText h4").html("ROCK GOD");
  $("#bannerSmallText h5").html("Upload");
  $("#uploadButton").show();
  $("footer").hide();
});




/*--------------------------------------------------------------CAROUSEL-----------------------------------------------------------*/
/*---------------------------------------------------------------PAGE--------------------------------------------------------------*/
/*---------------------------------------------------------------CODE--------------------------------------------------------------*/

//Click on the Guitar Model to Change Models and Overlay
$("#containerGuitarNav").click(function () { 

  if ($("#userImage").attr("src") == "") {

  }
  
  else {

    //Set nav classes to cycle through
  	var navClasses = ["navExpl", "navStrato", "navRick", "navFly", "navLesPaul", "navJazz"];
    //set model classes to cycle through, in the same order as above!
  	var modelClasses = ["GibsonExplorer", "FenderStratocaster", "Rickenbacker", "GibsonFlyingV", "GibsonLesPaul", "FenderJazzmaster"]; 
    
    //once the user clicks the first  guitar option the footer will appear and stay visible
  	$("footer").show(); 
    
    //cycling through guitar models in the nav
  	$("#containerGuitarNav").each(function(){ 
  		this.className = navClasses[($.inArray(this.className, navClasses)+1)%navClasses.length];
  		$("#guitarOverlay").removeAttr("style");
  	});
    
    //and cycling throught the corrisponding overlays.
  	$("#guitarOverlay").each(function(){   
  		this.className = modelClasses[($.inArray(this.className, modelClasses)+1)%modelClasses.length];
      upDown();
      leftRight();
      shrinkGrow();
      liftDip();
  	});

    //When cycling through models, hide all color options...
  	$("li").hide();  
    
    //...Then show only COLOR OPTIONS THAT ARE RELAVENT!
  	$(function() { 
  		
  		if ($("#containerGuitarNav").hasClass("navExpl")) {
    			$(".black, .deepRed, .gray, .blue, .lightBlue, .redGray, .darkWood, .lightWood, .snakeSkin, .white, .yellow, .blackWhiteStripe, .batWing").show();
    			$("#bannerSmallText h4").html("Explorer");
    			$("#bannerSmallText h5").html("Gibson");
    		} 

    		else if ($("#containerGuitarNav").hasClass("navStrato")) {
    			$(".fireglow, .seafoam, .pink, .antigua, .red, .bobMarley, .blackGrayStripe, .americanSlang, .kiss, .chartreuse").show();
    			$("#bannerSmallText h4").html("Stratocaster");
    			$("#bannerSmallText h5").html("Fender");

    		} 

    		else if ($("#containerGuitarNav").hasClass("navRick")) {
    			$(".black, .seafoam, .gray, .green, .blue, .orange, .red, .yellow, .lightWood, .purple").show();
    			$("#bannerSmallText h4").html("330");
    			$("#bannerSmallText h5").html("Rickenbacker");
    		} 

    		else if ($("#containerGuitarNav").hasClass("navFly")) {
    			$(".black, .white, .jimmyHendrix, .lightWood, .purple, .deepRed, .gray, .green, .greenYellow, .blue, .red, .blackWhiteHalf, .blackWhiteSpiral").show();
    			$("#bannerSmallText h4").html("Flying V");
    			$("#bannerSmallText h5").html("Gibson");
    		} 

    		else if ($("#containerGuitarNav").hasClass("navLesPaul")) {
    			$(".lightBlue, .seafoam, .deepPurple, .yellow, .deepBlue, .butterfly, .gold, .gray, .greenPaisley").show();
    			$("#bannerSmallText h4").html("Les Paul");
    			$("#bannerSmallText h5").html("Gibson");
    		}

        else if ($("#containerGuitarNav").hasClass("navJazz")) {
          $(".seafoam, .purple, .darkWood, .lightBlue, .black, .fireglow").show();
          $("#bannerSmallText h4").html("Jazzmaster");
          $("#bannerSmallText h5").html("Fender");
        }

        //END OF LOOP!
    		else {

    		};
      });
  	};
}); 

/*-------------------------------------------------------------GUITAR------------------------------------------------------------*/
/*-------------------------------------------------------------COLOR-------------------------------------------------------------*/
/*------------------------------------------------------------NAVIGATION---------------------------------------------------------*/

$("li").click(function() {

    var originalPosition = $("#guitarOverlay").css("left");
		var guitar = $("#guitarOverlay").attr("class");
		var color = String($(this).attr("class"));
		var color = color.charAt(0).toUpperCase() + color.substring(1);
		console.log(guitar);
		console.log(color);

		$("#guitarOverlay").animate({ left: "-250%"} , 400, function() {

			$("#guitarOverlay").css({"background": "url(\"images/webGit/" + guitar + "-" + color + ".png\") top center no-repeat",
									"background-size": "100%"});
		});

		$("#guitarOverlay").animate({ left: originalPosition } , 400);
});

/*--------------------------------------------------------------GUITAR------------------------------------------------------------*/
/*-------------------------------------------------------------POSITION-------------------------------------------------------------*/
/*-------------------------------------------------------------CONTROLS---------------------------------------------------------*/


$("#upDown").change("keyup", upDown);
$("#leftRight").change("keyup", leftRight);
$("#shrinkGrow").change("keyup", shrinkGrow);
$("#liftDip").change("keyup", liftDip);

function upDown() {
    var change = $("#upDown").val();
    var change = -+change;
    console.log(change);
    $("#guitarOverlay").css("top", 30 - change + "%");
};

function leftRight() {
    var change = $("#leftRight").val();
    var change = -+change;
    console.log(change);
    $("#guitarOverlay").css("left", 50 - change + "%");
};

function shrinkGrow() {
    var change = $("#shrinkGrow").val();
    var change = -+change;
    console.log(change);
    $("#guitarOverlay").css("width", 400 - change + "px");
};

function liftDip() {
    var change = $("#liftDip").val();
    var change = -+change;
    console.log(change);
    $("#guitarOverlay").css("transform", "rotate(" + (0 - change) + "deg)");
};

}) //end of DOCUMENT READY