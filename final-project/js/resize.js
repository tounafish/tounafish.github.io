$(document).ready(function() {
    $('.story-small img').each(function() {
    var maxWidth = 100; // Max width for the image
    var maxHeight = 100;    // Max height for the image
    var ratio = 0;  // Used for aspect ratio
    var width = $(this).width();    // Current image width
    var height = $(this).height();  // Current image height

    // Check if the current width is larger than the max
    if(width > maxWidth){
        ratio = maxWidth / width;   // get ratio for scaling image
        $(this).css("width", maxWidth); // Set new width
        $(this).css("height", height * ratio);  // Scale height based on ratio
        height = height * ratio;    // Reset height to match scaled image
    }

    var width = $(this).width();    // Current image width
    var height = $(this).height();  // Current image height

    // Check if current height is larger than max
    if(height > maxHeight){
        ratio = maxHeight / height; // get ratio for scaling image
        $(this).css("height", maxHeight);   // Set new height
        $(this).css("width", width * ratio);    // Scale width based on ratio
        width = width * ratio;    // Reset width to match scaled image
    }
});


/* 

SECOND OPTION

$('img.resize').each(function(){
    $(this).load(function(){
        var maxWidth = $(this).width(); // Max width for the image
        var maxHeight = $(this).height();   // Max height for the image
        $(this).css("width", "auto").css("height", "auto"); // Remove existing CSS
        $(this).removeAttr("width").removeAttr("height"); // Remove HTML attributes
        var width = $(this).width();    // Current image width
        var height = $(this).height();  // Current image height

        if(width > height) {
            // Check if the current width is larger than the max
            if(width > maxWidth){
                var ratio = maxWidth / width;   // get ratio for scaling image
                $(this).css("width", maxWidth); // Set new width
                $(this).css("height", height * ratio);  // Scale height based on ratio
                height = height * ratio;    // Reset height to match scaled image
            }
        } else {
            // Check if current height is larger than max
            if(height > maxHeight){
                var ratio = maxHeight / height; // get ratio for scaling image
                $(this).css("height", maxHeight);   // Set new height
                $(this).css("width", width * ratio);    // Scale width based on ratio
                width = width * ratio;  // Reset width to match scaled image
            }
        }
    });
});



THIRD OPTION

$(document).ready(function(){
    $('img').each(function(){
        var maxWidth = 660;
        var ratio = 0;
        var img = $(this);

        if(img.width() > maxWidth){
            ratio = img.height() / img.width();
            img.attr('width', maxWidth);
            img.attr('height', (maxWidth*ratio));   
        }
    });
});

This only works for landscape 
mode. But if you look at it, 
only a few things have to be 
done to set it to portrait, aka, 
if img.height() > maxHeight).




FOURTH OPTION (good one)

$(function() {
  $('.mhz-news-img img').each(function() {
    var maxWidth = 320; // Max width for the image
    var maxHeight = 200;    // Max height for the image
    var maxratio=maxHeight/maxWidth;
    var width = $(this).width();    // Current image width
    var height = $(this).height();  // Current image height
    var curentratio=height/width;
    // Check if the current width is larger than the max

    if(curentratio>maxratio)
    {
        ratio = maxWidth / width;   // get ratio for scaling image
        $(this).css("width", maxWidth); // Set new width
        $(this).css("height", height *ratio); // Scale height based on ratio
    }
    else
    { 
        ratio = maxHeight / height; // get ratio for scaling image
        $(this).css("height", maxHeight);   // Set new height
        $(this).css("width", width * ratio);    // Scale width based on ratio
    }
  });
});




*/