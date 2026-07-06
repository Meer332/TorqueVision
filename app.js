/*=========================================
            REVHEADZ APP
=========================================*/

let dragCoefficient = 0.004;
let rollingResistance = 0.018;
let brakeForce = 0.45;

let odometer = 0;
let fuel = 100;
let coolant = 90;
let oilTemp = 90;
let battery = 14.2;

const odoText = document.querySelector(".odo span");

/*==========================
    PHYSICS
==========================*/

function updatePhysics(){

    if(!engineOn){

        if(speed>0){

            speed-=0.25;

            if(speed<0) speed=0;

        }

        return;

    }

    /* AIR DRAG */

    speed -= speed * dragCoefficient;

    /* ROLLING */

    speed -= rollingResistance;

    /* BRAKE */

    if(brake>0){

        speed -= brake * brakeForce * 0.02;

    }

    /* LIMIT */

    if(speed<0) speed=0;

    const maxSpeed=parseFloat(
        topSpeedText.innerText
    );

    if(speed>maxSpeed){

        speed=maxSpeed;

    }

}

/*==========================
    ODOMETER
==========================*/

function updateOdometer(){

    odometer += speed/5000;

    odoText.innerText =
    Math.floor(odometer)
    .toString()
    .padStart(6,"0");

}

/*==========================
    FUEL
==========================*/

function updateFuel(){

    if(engineOn){

        fuel -= throttle*0.00005;

        if(fuel<0){

            fuel=0;

        }

    }

}

/*==========================
    TEMPERATURE
==========================*/

function updateTemps(){

    if(engineOn){

        coolant += throttle*0.003;

        oilTemp += throttle*0.004;

    }

    else{

        coolant -= .03;

        oilTemp -= .04;

    }

    coolant=Math.max(80,Math.min(120,coolant));

    oilTemp=Math.max(80,Math.min(140,oilTemp));

}

/*==========================
    BATTERY
==========================*/

function updateBattery(){

    if(engineOn){

        battery=14.2;

    }

    else{

        battery-=0.0005;

        if(battery<11.5){

            battery=11.5;

        }

    }

}

/*==========================
 MAIN LOOP
==========================*/

function appLoop(){

    updatePhysics();

    updateFuel();

    updateTemps();

    updateBattery();

    updateOdometer();

    requestAnimationFrame(appLoop);

}

appLoop();