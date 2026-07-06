/*=========================================
            REVHEADZ CARS
=========================================*/

let currentTopSpeed = 340;
let currentAcceleration = 1;
let currentRPMResponse = 0.07;
const carSelect = document.getElementById("carSelect");

const hpText = document.getElementById("hp");
const torqueText = document.getElementById("torque");
const weightText = document.getElementById("weight");
const topSpeedText = document.getElementById("topSpeed");

const cars = {

    "Ferrari SF90":{

        hp:986,
        torque:800,
        weight:1570,
        topSpeed:340,

        idle:900,
        redline:8500,

        acceleration:1.00,
        rpmResponse:0.075,

        color:"#ff3030"

    },

    "Lamborghini Huracan":{

        hp:631,
        torque:601,
        weight:1422,
        topSpeed:325,

        idle:850,
        redline:8700,

        acceleration:0.92,
        rpmResponse:0.082,

        color:"#e3ff00"

    },

    "Porsche GT3 RS":{

        hp:518,
        torque:465,
        weight:1450,
        topSpeed:296,

        idle:900,
        redline:9000,

        acceleration:0.88,
        rpmResponse:0.095,

        color:"#00d0ff"

    },

    "BMW M4 CSL":{

        hp:543,
        torque:650,
        weight:1625,
        topSpeed:307,

        idle:800,
        redline:7200,

        acceleration:0.84,
        rpmResponse:0.060,

        color:"#00a2ff"

    },

    "Bugatti Chiron":{

        hp:1479,
        torque:1600,
        weight:1995,
        topSpeed:420,

        idle:750,
        redline:6700,

        acceleration:1.35,
        rpmResponse:0.045,

        color:"#ff8800"

    }

};
function loadCar(name){

    const car = cars[name];

    hpText.textContent = car.hp + " HP";
    torqueText.textContent = car.torque + " Nm";
    weightText.textContent = car.weight + " Kg";
    topSpeedText.textContent = car.topSpeed + " km/h";

    idleRPM = car.idle;
    maxRPM = car.redline;

    // NEW
   currentTopSpeed = car.topSpeed;
currentAcceleration = car.acceleration;
currentRPMResponse = car.rpmResponse;

    document.documentElement.style.setProperty(
        "--accent",
        car.color
    );

}

carSelect.addEventListener("change",()=>{

    loadCar(carSelect.value);

});

loadCar(carSelect.value);