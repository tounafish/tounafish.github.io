document.getElementById("blue").onclick=coldBlue;

function coldBlue() {
  document.getElementById("all").style.color = "white";
  document.getElementById("all").style.backgroundColor = "blue";
}

document.getElementById("red").onclick = hotRed;

function hotRed() {
  document.getElementById("all").style.color = "yellow";
  document.getElementById("all").style.backgroundColor = "red";
}

document.getElementById("gray").onclick = netGray;

function netGray() {
  document.getElementById("all").style.color = "orange";
  document.getElementById("all").style.backgroundColor = "gray";
}