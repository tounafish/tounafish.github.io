$(document).ready(function(){
$("a").click(function(){
  $("p").css("color", $(this).html());
});