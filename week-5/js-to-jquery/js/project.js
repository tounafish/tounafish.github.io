document.getElementsByTagName("a")[0].onclick = changeRed;
document.getElementsByTagName("a")[1].onclick = changeBlue;
document.getElementsByTagName("a")[2].onclick = changeGreen;
document.getElementsByTagName("a")[3].onclick = changePink;

function changeRed() {
  var paragraphs = document.getElementsByTagName("p");

  for(var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.color = "red";
  }
}

function changeBlue() {
  var paragraphs = document.getElementsByTagName("p");

  for(var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.color = "blue";
  }
}

function changeGreen() {
  var paragraphs = document.getElementsByTagName("p");

  for(var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.color = "green";
  }
}

function changePink() {
  var paragraphs = document.getElementsByTagName("p");

  for(var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.color = "pink";
  }
}