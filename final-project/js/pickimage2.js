$(document).ready(function() {

	$(".animationdiv img").on('click',function(){	
		var src = $(this).attr('src');
	   
        var ind = $('.boxsize');
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
        
        $(".boxsize").css('background-image',"url("+src+")");
        $("body").animate({scrollTop: 0}, "slow");
    });

});