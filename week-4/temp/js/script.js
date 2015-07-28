document.getElementById("hot").onclick = switchGray;

function switchGray() {
  document.getElementById("all").style.color = "white";
  document.getElementById("all").style.backgroundColor = "gray";
}

document.getElementById("lower").onclick = switchWhite;

function switchWhite() {
  document.getElementById("all").style.color = "black";
  document.getElementById("all").style.backgroundColor = "white";
}

document.getElementById("raise").onclick = switchBlue;

function switchBlue() {
  document.getElementById("all").style.color = "white";
  document.getElementById("all").style.backgroundColor = "blue";
}