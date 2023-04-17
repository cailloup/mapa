/*
    zoom
*/
const mapSectionZoom = document.getElementById("map-section");

let scale = 1;
let lastScale = 1;
let fingerdist = 0;
let onScreenFingers = []

const el = document.getElementById("mapdiv");


function zoom(delta) {

    scale += delta * -0.001;
    el.style.transform = `scale(${scale})`;

}

function onTouchStart(event){
    
  if (event.touches.length == 2){
        onScreenFingers = [event.touches[0], event.touches[1]];
        fingerdist = fingerDistance(onScreenFingers);
  }
}

function onTouchEnd(event){
    lastScale = scale;
    fingerdist=0;
}
  
function fingerDistance(onScreenFingers){
    return Math.sqrt(
        Math.pow(onScreenFingers[1].clientX - onScreenFingers[0].clientX, 2) +
        Math.pow(onScreenFingers[1].clientY - onScreenFingers[0].clientY, 2)
    );
}

function onTouchMove(event){
    
    let deltaFingers = fingerDistance(event.touches) - fingerdist;
        
    scale = lastScale + deltaFingers * 0.005;
    el.style.transform = `scale(${scale})`;
    
}

function onWheel(event){
    zoom(event.deltaY);
}

mapSectionZoom.addEventListener("wheel",onWheel,false);

mapSectionZoom.addEventListener("touchmove", onTouchMove,{ passive: false });

mapSectionZoom.addEventListener("touchstart", onTouchStart,false);

mapSectionZoom.addEventListener("touchend", onTouchEnd,false);