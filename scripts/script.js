function zoom(event) {


    scale += event.deltaY * -0.001;

    //scale = Math.min(Math.max(0.125, scale), 4);

    el.style.transform = `scale(${scale})`;
 }
    

let scale = 1;
const el = document.getElementById("mapdiv");


document.onwheel = zoom;
const body = document.getElementById("body")
dragElement(document.getElementById("mapdiv"));
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    body.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        body.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        body.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
       // elmnt.style.left = Math.min(Math.max((elmnt.offsetLeft - pos1),-500),500) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        body.onmouseup = null;
        body.onmousemove = null;
    }

    
}

function show(id,p){
    const elemento = document.querySelector("#"+id);
    elemento.classList.toggle("hide");
    document.querySelector("#"+p).classList.toggle("selected");
}