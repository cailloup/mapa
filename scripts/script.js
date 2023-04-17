/*
    zoom
*/
let scale = 1;
const el = document.getElementById("mapdiv");

function zoom(event) {
  if (event.type == "touchmove") {
    event.preventDefault();
    let finger1 = event.touches[0];
    let finger2 = event.touches[1];

    let distance = Math.sqrt(
      Math.pow(finger2.clientX - finger1.clientX, 2) +
      Math.pow(finger2.clientY - finger1.clientY, 2)
    );

    let scaleValue = distance / 100;

    if (scaleValue > 0.25 && scaleValue < 4) {
      scale = scaleValue;
    }
  } else {
    scale += event.deltaY * -0.001;
  }

  el.style.transform = `scale(${scale})`;
}

document.onwheel = zoom;
document.addEventListener("touchmove", zoom, { passive: false });


//move map

const mapSection = document.getElementById("map-section")
var isTouchDevice = 'ontouchstart' in document.documentElement;
dragElement(document.getElementById("mapdiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  if (isTouchDevice) {
    mapSection.addEventListener("touchstart", dragStart, { passive: false });
    mapSection.addEventListener("touchend", dragEnd, { passive: false });
    mapSection.addEventListener("touchmove", drag, { passive: false });
  } else {
    mapSection.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;
    mapSection.onmouseup = closeDragElement;

    mapSection.onmousemove = elementDrag;
  }

  function dragStart(e) {
    pos3 = e.touches[0].clientX;
    pos4 = e.touches[0].clientY;
  }

  function drag(e) {
    e.preventDefault();

    pos1 = pos3 - e.touches[0].clientX;
    pos2 = pos4 - e.touches[0].clientY;
    pos3 = e.touches[0].clientX;
    pos4 = e.touches[0].clientY;

    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function dragEnd(e) {
    mapSection.onmouseup = null;
    mapSection.onmousemove = null;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    mapSection.onmouseup = null;
    mapSection.onmousemove = null;
  }
}


//hide
function show(id,p){
    const elemento = document.querySelector("#"+id);
    elemento.classList.toggle("hide");
    document.querySelector("#"+p).classList.toggle("selected");
}