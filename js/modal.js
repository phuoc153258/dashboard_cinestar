const modal = document.getElementById("myModal");
const btn = document.querySelectorAll("#myBtn");
const span = document.getElementsByClassName("close")[0];
for (let index = 0; index < btn.length; index++) {
    btn[index].onclick = function() {
        modal.style.display = "block";
    }
}

span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}