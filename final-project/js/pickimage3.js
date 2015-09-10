$(document).ready(function() {



    var speed = 8;
 
    /*speed = prompt("Enter speed");*/
    $("#submitme").on("click",function(){
        var speed = $("#getme").val();
        $(".boxsize").css("transition", "transform "+100/speed+"s");
        $(".jack").addClass("hidden");
        $(".box-footer").removeClass("hidden");
        $("footer").removeClass("hidden");
    });

    // large images 1200px that will be changed to 600px
	$(".image70 img").on("click",function(){	
		var src = $(this).attr("src");
        var ind = $(".boxsize");
        var top = 0;
        var left = 0;

        for(i=0; i < ind.length; i++){
            ind[i].style.backgroundPosition = left+"px "+top+"px";
            if(i<7){
                left = (left-75);
            }
            if(i==7){
                left = 0;
                top = -75;
            }
            if(i>7&&i<15){
                left = (left-75);
            }
            if(i==15){
                left = 0;
                top = -150;
            }
            if(i>15&&i<23){
                left = (left-75);
            }
            if(i==23){
                left = 0;
                top = -225;
            }
            if(i>23&&i<31){
                left = (left-75);
            }
            if(i==31){
                left = 0;
                top = -300;
            }
            if(i>31&&i<39){
                left = (left-75);
            }
            if(i==39){
                left = 0;
                top = -375;
            }
            if(i>39&&i<47){
                left = (left-75);
            }
        } 

        //loads image, resizes and scrolls to top
        $(".boxsize").css("background-image","url("+src+")");
        $(".boxsize").css("background-size", "600px");
        $("body").animate({scrollTop: 0}, "slow");

        //show detonator and hides logo
        $("#detonator").css("display", "block");
        $("#logo").css("display", "none");
        $(".box-footer").addClass("hidden");
        });


        //medium image 900px that will be changed to 600px
        $(".image50 img").on("click",function(){   
        var src = $(this).attr("src");
        var ind = $(".boxsize");
        var top = 0;
        var left = 0;

        for(i=0; i < ind.length; i++){
            ind[i].style.backgroundPosition = left+"px "+top+"px";
            if(i<7){
                left = (left-75);
            }
            if(i==7){
                left = 0;
                top = -75;
            }
            if(i>7&&i<15){
                left = (left-75);
            }
            if(i==15){
                left = 0;
                top = -150;
            }
            if(i>15&&i<23){
                left = (left-75);
            }
            if(i==23){
                left = 0;
                top = -225;
            }
            if(i>23&&i<31){
                left = (left-75);
            }
            if(i==31){
                left = 0;
                top = -300;
            }
            if(i>31&&i<39){
                left = (left-75);
            }
            if(i==39){
                left = 0;
                top = -375;
            }
            if(i>39&&i<47){
                left = (left-75);
            }
        } 

        //loads image, resizes and scrolls to top
        $(".boxsize").css("background-image","url("+src+")");
        $(".boxsize").css("background-size", "600px");
        $("body").animate({scrollTop: 0}, "slow");

        //show detonator and hides logo
        $("#detonator").css("display", "block");
        $("#logo").css("display", "none");
        $(".box-footer").addClass("hidden");
        });


        //small image 600px
        $(".image30 img").on("click",function(){   
        var src = $(this).attr("src");
       
        var ind = $(".boxsize");
        var top = 0;
        var left = 0;

        for(i=0; i < ind.length; i++){
            ind[i].style.backgroundPosition = left+"px "+top+"px";
            if(i<7){
                left = left-75;
            }
            if(i==7){
                left = 0;
                top = -75;
            }
            if(i>7&&i<15){
                left = left-75;
            }
            if(i==15){
                left = 0;
                top = -150;
            }
            if(i>15&&i<23){
                left = left-75;
            }
            if(i==23){
                left = 0;
                top = -225;
            }
            if(i>23&&i<31){
                left = left-75;
            }
            if(i==31){
                left = 0;
                top = -300;
            }
            if(i>31&&i<39){
                left = left-75;
            }
            if(i==39){
                left = 0;
                top = -375;
            }
            if(i>39&&i<47){
                left = left-75;
            }
        } 

        //loads image and scrolls to top
        $(".boxsize").css("background-image","url("+src+")");
        $("body").animate({scrollTop: 0}, "slow");

        //show detonator and hides logo
        $("#detonator").css("display", "block");
        $("#logo").css("display", "none");
        $(".box-footer").addClass("hidden");
        });





    //User Image URL input
    $("#clickme").on("click",function(){    
        var src = $("#userurl").val();
        var ind = $(".boxsize");
        var top = 0;
        var left = 0;

        for(i=0; i < ind.length; i++){
            ind[i].style.backgroundPosition = left+"px "+top+"px";
            if(i<7){
                left = (left-75);
            }
            if(i==7){
                left = 0;
                top = -75;
            }
            if(i>7&&i<15){
                left = (left-75);
            }
            if(i==15){
                left = 0;
                top = -150;
            }
            if(i>15&&i<23){
                left = (left-75);
            }
            if(i==23){
                left = 0;
                top = -225;
            }
            if(i>23&&i<31){
                left = (left-75);
            }
            if(i==31){
                left = 0;
                top = -300;
            }
            if(i>31&&i<39){
                left = (left-75);
            }
            if(i==39){
                left = 0;
                top = -375;
            }
            if(i>39&&i<47){
                left = (left-75);
            }
        } 

        //loads image, resizes and scrolls to top
        $(".boxsize").css("background-image","url("+src+")");
        $(".boxsize").css("background-size", "600px");
        $("body").animate({scrollTop: 0}, "slow");

        //show detonator and hides logo
        $("#detonator").css("display", "block");
        $("#logo").css("display", "none");
        $(".box-footer").addClass("hidden");
        });









        //click detonator to explode boxes
        $("#detonator").on("click",function(){
            var ind = $(".boxsize");
            var x = ["top-left", "top-right", "bottom-left", "bottom-right", "midddle-left", "middle-right"]
        setTimeout(function(){
            for(i=0; i < ind.length; i++){
                ind[i].className = ind[i].className + " "+ x[Math.floor(Math.random()*6)]
            }

        },100);

            //shows reset button after explosion and plays sound
            $(".reset").removeClass();
            $("#detonator").css("display", "none");
            $("#logo").css("display", "block");
            var audio = $("audio")[0];
            audio.play();
        });

    
});