/*
    zoom
*/

let scale = 1;
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
    alert(deltaFingers);
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
        
    
    zoom(deltaFingers * -0.2);
}

function onWheel(event){
    zoom(event.deltaY);
}

document.addEventListener("wheel",onWheel,false);

document.addEventListener("touchmove", onTouchMove,{ passive: false });

document.addEventListener("touchstart", onTouchStart,false);

document.addEventListener("touchend", onTouchEnd,false);