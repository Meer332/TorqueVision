/*=========================================
            REVHEADZ UI
=========================================*/

const Buttons = document.querySelectorAll(".mode");
const modeText = document.querySelector(".modeText");

const dashboard = document.getElementById("dashboard");
const warningIcons = document.querySelectorAll(".warningBar div");

let currentMode = "Race";

/*--------------------------
        DRIVE MODES
--------------------------*/

modeButtons.forEach(button=>{

    button.onclick=()=>{

        modeButtons.forEach(b=>b.classList.remove("active"));

        button.classList.add("active");

        currentMode=button.innerText;

        modeText.innerText=currentMode.toUpperCase();

        switch(currentMode){

            case "Race":

                document.documentElement.style
                .setProperty("--accent","#ff3030");

                throttleResponse=1.4;

                break;

            case "Sport+":

                document.documentElement.style
                .setProperty("--accent","#ff6600");

                throttleResponse=1.25;

                break;

            case "Sport":

                document.documentElement.style
                .setProperty("--accent","#00c6ff");

                throttleResponse=1.05;

                break;

            case "Comfort":

                document.documentElement.style
                .setProperty("--accent","#00ff8c");

                throttleResponse=.85;

                break;

            case "Eco":

                document.documentElement.style
                .setProperty("--accent","#66ff00");

                throttleResponse=.65;

                break;

        }

    };

});

/*--------------------------
     START BUTTON GLOW
--------------------------*/

function updateUI(){

    if(engineOn){

        startStop.classList.add("engineOn");

    }

    else{

        startStop.classList.remove("engineOn");

    }

}

/*--------------------------
 TURN SIGNALS
--------------------------*/

let left=false;
let right=false;

document.addEventListener("keydown",(e)=>{

    if(e.code==="KeyZ"){

        left=!left;

    }

    if(e.code==="KeyX"){

        right=!right;

    }

});

setInterval(()=>{

    document.getElementById("leftIndicator")
    .style.opacity=left?
    (
        document.getElementById("leftIndicator")
        .style.opacity=="1" ? ".15":"1"
    )
    :"1";

    document.getElementById("rightIndicator")
    .style.opacity=right?
    (
        document.getElementById("rightIndicator")
        .style.opacity=="1" ? ".15":"1"
    )
    :"1";

},350);

/*--------------------------
 RANDOM WARNING TEST
--------------------------*/

setInterval(()=>{

    warningIcons.forEach(i=>i.classList.remove("active"));

    if(Math.random()<0.08){

        warningIcons[
            Math.floor(Math.random()*warningIcons.length)
        ].classList.add("active");

    }

},2500);

/*--------------------------
 MAIN LOOP
--------------------------*/

function uiLoop(){

    updateUI();

    requestAnimationFrame(uiLoop);

}

uiLoop();   