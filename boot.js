/*=========================================
            TORQUEVISION BOOT
=========================================*/

const bootBar =
    document.getElementById("bootProgress");

const bootScreen =
    document.getElementById("bootScreen");

let progress = 0;

const timer = setInterval(()=>{

   progress += Math.random()*3;
   const status=document.getElementById("bootStatus");

if(progress>20) status.innerHTML="Loading Transmission...";
if(progress>40) status.innerHTML="Loading ABS...";
if(progress>60) status.innerHTML="Loading Dashboard...";
if(progress>80) status.innerHTML="System Ready...";
    bootBar.style.width = progress + "%";

   if(progress >= 100){

    clearInterval(timer);

    // Gauge sweep
    let oldSpeed = speed;
    let oldRPM = rpm;

    speed = currentTopSpeed;
    rpm = maxRPM;

    updateShiftLights(true);

    setTimeout(()=>{

        speed = 0;
        rpm = idleRPM;

        updateShiftLights(false);

    },700);

    bootScreen.style.opacity="0";
    bootScreen.style.transition="opacity .8s";

    setTimeout(()=>{

        bootScreen.remove();

    },900);

}

},20);