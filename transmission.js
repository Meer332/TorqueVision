let currentGear = 1;

const gearRatios = [
    3.80,
    2.35,
    1.65,
    1.28,
    1.02,
    0.82
];
const gearButtons = document.querySelectorAll(".gearButtons button");
const gearDisplay = document.getElementById("gear");

gearButtons.forEach(button=>{

    button.onclick=()=>{

        gear = button.innerText;

        gearDisplay.textContent = gear;

    };

});