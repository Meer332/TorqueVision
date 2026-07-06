/*==================================
        REVHEADZ ENGINE
==================================*/

let throttleResponse = 1;
let rpmMultiplier = 1;
let speedMultiplier = 1;
let engineOn = false;

let rpm = 0;
let speed = 0;
let odo = 0;
let coolantTemp = 20;
let fuelLevel = 100;
let oilPressure = 2.0;
let batteryVoltage = 12.4;
let gear = "N";
let driveMode = "Race";

let throttle = 0;
let brake = 0;
let idleRPM = 850;
let maxRPM = 9000;

const startStop=document.getElementById("startStop");

const throttleFill = document.getElementById("throttleFill");
const brakeFill = document.getElementById("brakeFill");
const clutchFill = document.getElementById("clutchFill");

const modeButtons = document.querySelectorAll(".mode");
const tempFill = document.getElementById("tempFill");
const tempValue = document.getElementById("tempValue");

modeButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        modeButtons.forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        driveMode = btn.textContent.trim();

        document.querySelector(".modeText").textContent =
            driveMode.toUpperCase();

    });

});
/*=========================
    START / STOP
=========================*/

startStop.onclick = () => {

    engineOn = !engineOn;

    if(engineOn){

        startEngineSounds();   // <-- ADD THIS

        rpm = idleRPM;

        startStop.innerHTML = "ENGINE<br>ON";

        startStop.style.borderColor = "#00ff66";

    }

    else{

        stopEngineSounds();    // <-- ADD THIS

        rpm = 0;
        speed = 0;

        startStop.innerHTML = "ENGINE<br>START";

        startStop.style.borderColor = "#666";

    }

}

/*=========================
      KEYBOARD
=========================*/

const keys = {};

document.addEventListener("keydown",e=>{

    keys[e.code]=true;

});

document.addEventListener("keyup",e=>{

    keys[e.code]=false;

});

/*=========================
        ENGINE LOOP
=========================*/

function engineLoop(){

    /*=========================
        KEY INPUT
    =========================*/

    const throttlePressed =
        keys["KeyW"] || keys["ArrowUp"];

    const brakePressed =
        keys["KeyS"] || keys["ArrowDown"];

    /*=========================
        ENGINE OFF
    =========================*/

    if(!engineOn){

    throttle = 0;
    brake = 0;
    rpm = 0;
    speed = 0;

    throttleFill.style.width = "0%";
    brakeFill.style.width = "0%";
    clutchFill.style.width = "0%";

    requestAnimationFrame(engineLoop);
    return;

}

    /*=========================
        THROTTLE
    =========================*/

    if(throttlePressed){

        throttle += 4;

    }else{

        throttle -= 3;

    }

    throttle = Math.max(0,Math.min(100,throttle));

    /*=========================
        BRAKE
    =========================*/

    if(brakePressed){

        brake += 5;

    }else{

        brake -= 4;
       

    }

    brake = Math.max(0,Math.min(100,brake));

    /*=========================
        PEDAL BARS
    =========================*/

    throttleFill.style.width = throttle + "%";
    brakeFill.style.width = brake + "%";

    let clutch = keys["ShiftLeft"] ? 100 : 0;

    clutchFill.style.width = clutch + "%";


    switch(driveMode){

    case "Race":

        throttleResponse = 1.4;
        rpmMultiplier = 1.15;
        speedMultiplier = 1.20;

        break;

    case "Sport+":

        throttleResponse = 1.2;
        rpmMultiplier = 1.08;
        speedMultiplier = 1.10;

        break;

    case "Sport":

        throttleResponse = 1.0;
        rpmMultiplier = 1.0;
        speedMultiplier = 1.0;

        break;

    case "Comfort":

        throttleResponse = 0.8;
        rpmMultiplier = 0.90;
        speedMultiplier = 0.85;

        break;

    case "Eco":

        throttleResponse = 0.55;
        rpmMultiplier = 0.75;
        speedMultiplier = 0.65;

        break;

}

    /*=========================
        RPM
    =========================*/

  let targetRPM =
    idleRPM +
    (throttle/100) *
    (maxRPM-idleRPM) *
    throttleResponse *
    rpmMultiplier;

    rpm += (targetRPM - rpm) * currentRPMResponse;

    rpm = Math.max(idleRPM,
          Math.min(maxRPM,rpm));

    /*=========================
        SPEED
    =========================*/

  /*=========================
        SPEED
=========================*/

if(gear === "D"){

   // Percentage of top speed reached
const percent = speed / currentTopSpeed;

// Smooth acceleration curve
let acceleration = 14 - (percent * 8);

// Never let acceleration become too low
acceleration = Math.max(5, acceleration);

// Reduce acceleration gradually as top speed is approached
let factor = 1 - percent;

// Keep enough pulling power near top speed
factor = Math.max(0.45, factor);

// Final acceleration
speed +=
(throttle/100) *
acceleration *
gearRatios[currentGear-1] *
currentAcceleration *
factor *
speedMultiplier;


// Brake
speed -= (brake / 100) * 8;

// Air resistance
speed -= speed * 0.0007;
// Clamp
speed = Math.max(0, speed);

if(speed > currentTopSpeed){

    speed = currentTopSpeed;

}
}
// Automatic upshift
if(rpm > maxRPM - 400 && currentGear < gearRatios.length){

    currentGear++;

    rpm *= 0.72;

}

// Automatic downshift
if(rpm < 2500 && currentGear > 1){

    currentGear--;

    rpm *= 1.25;

}

/*=========================
    COOLANT TEMPERATURE
=========================*/

if(engineOn){

    // Temperature the engine wants to reach
    let targetTemp = 75;

    // Increase target based on RPM
    targetTemp += ((rpm - idleRPM) / (maxRPM - idleRPM)) * 35;

    // Eco mode runs cooler
    if(driveMode === "Eco") targetTemp -= 5;

    // Race mode runs hotter
    if(driveMode === "Race") targetTemp += 5;

    // Smoothly move towards target
    coolantTemp += (targetTemp - coolantTemp) * 0.0025;

    // Extra cooling from airflow
    coolantTemp -= speed * 0.00015;

}
else{

    // Engine OFF cools down
    coolantTemp += (20 - coolantTemp) * 0.0015;

}

// Clamp
coolantTemp = Math.max(20, Math.min(120, coolantTemp));

tempValue.textContent =
    Math.round(coolantTemp) + "°C";

    /*=========================
        FUEL
=========================*/

if(engineOn){

    fuelLevel -= speed * 0.000002;

}

fuelLevel = Math.max(0,fuelLevel);

fuelValue.textContent =
    Math.round(fuelLevel) + "%";

/*=========================
      OIL PRESSURE
=========================*/

oilPressure =
    2 + (rpm/maxRPM)*5;

oilValue.textContent =
    oilPressure.toFixed(1);

/*=========================
    BATTERY VOLTAGE
=========================*/

batteryVoltage =
    engineOn
    ? 13.8 + (rpm/maxRPM)*0.6
    : 12.4;

voltValue.textContent =
    batteryVoltage.toFixed(1)+"V";

    /*=========================
        ODOMETER
    =========================*/

    odo += speed*0.00003;

    document.querySelector(".odo span").textContent =
        Math.floor(odo)
        .toString()
        .padStart(6,"0");
        updateEngineSound();

    requestAnimationFrame(engineLoop);

}

engineLoop();
