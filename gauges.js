/*=========================================
        REVHEADZ SVG GAUGES
=========================================*/

const SVG_NS = "http://www.w3.org/2000/svg";

const CENTER = 250;
const OUTER = 205;

/*=========================================
            DISPLAY VALUES
=========================================*/

let displayedSpeed = 0;
let displayedRPM = 0;

let speedVelocity = 0;
let rpmVelocity = 0;

/*=========================================
            SVG ELEMENTS
=========================================*/

const speedTicks = document.getElementById("speedTicks");
const rpmTicks = document.getElementById("rpmTicks");

const speedNumbers = document.getElementById("speedNumbers");
const rpmNumbers = document.getElementById("rpmNumbers");

const speedNeedle = document.getElementById("speedNeedle");
const rpmNeedle = document.getElementById("rpmNeedle");

const speedText = document.getElementById("speedText");
const rpmText = document.getElementById("rpmText");

/*=========================================
            CREATE TICKS
=========================================*/

function createTicks(group,total,redStart=false){

    group.innerHTML="";

    for(let i=0;i<=total;i++){

        const angle = 140-(280/total)*i;

        const rad = angle*Math.PI/180;

        let inner = 175;
        let width = 2;

        if(i%5===0){

            inner = 145;
            width = 4;

        }

        if(i%10===0){

            inner = 132;
            width = 5;

        }

        const x1 = CENTER + Math.cos(rad)*inner;
        const y1 = CENTER + Math.sin(rad)*inner;

        const x2 = CENTER + Math.cos(rad)*205;
        const y2 = CENTER + Math.sin(rad)*205;

        const tick = document.createElementNS(SVG_NS,"line");

        tick.setAttribute("x1",x1);
        tick.setAttribute("y1",y1);

        tick.setAttribute("x2",x2);
        tick.setAttribute("y2",y2);

        tick.setAttribute("stroke-width",width);

        if(redStart && i>=50){

            tick.setAttribute("stroke","#ff3030");

        }else{

            tick.setAttribute("stroke","white");

        }

        group.appendChild(tick);

    }

}

/*=========================================
            CREATE NUMBERS
=========================================*/



/*=========================================
        DRAW TICKS & NUMBERS
=========================================*/


/*=========================================
            UPDATE GAUGES
=========================================*/

function updateGauges(){

    if(typeof speed !== "number") return;
    if(typeof rpm !== "number") return;
    if(typeof maxRPM !== "number") return;
    if(typeof currentTopSpeed !== "number") currentTopSpeed = 340;

    /*=========================
        NEEDLE PHYSICS
    =========================*/

    let speedTarget = engineOn ? speed : 0;
    let rpmTarget = engineOn ? rpm : 0;

    // Spring effect
    speedVelocity += (speedTarget - displayedSpeed) * 0.020;
    rpmVelocity += (rpmTarget - displayedRPM) * 0.025;

    // Damping
    speedVelocity *= 0.88;
    rpmVelocity *= 0.86;

    displayedSpeed += speedVelocity;
    displayedRPM += rpmVelocity;

    if(displayedSpeed < 0) displayedSpeed = 0;
    if(displayedRPM < 0) displayedRPM = 0;

    /*=========================
        NEEDLE ANGLES
    =========================*/

    const speedAngle =
        -140 + (displayedSpeed / currentTopSpeed) * 280;

    const rpmAngle =
        -140 + (displayedRPM / maxRPM) * 280;

    speedNeedle.style.transform =
        `translate(-50%,-100%) rotate(${speedAngle}deg)`;

    rpmNeedle.style.transform =
        `translate(-50%,-100%) rotate(${rpmAngle}deg)`;

    speedText.textContent =
        Math.round(displayedSpeed);

    rpmText.textContent =
        Math.round(displayedRPM);

}

/*=========================================
            SHIFT LIGHTS
=========================================*/

function updateShiftLights(force=false){

    const lights =
        document.querySelectorAll(".shiftLight");

    if(!lights.length) return;

    lights.forEach(light=>{

        light.classList.remove(
            "green",
            "yellow",
            "red",
            "flash"
        );

    });

    const percent = force ? 1 : rpm / maxRPM;

    if(percent > 0.60){

        lights[0]?.classList.add("green");

    }

    if(percent > 0.70){

        lights[1]?.classList.add("green");

    }

    if(percent > 0.80){

        lights[2]?.classList.add("yellow");

    }

    if(percent > 0.88){

        lights[3]?.classList.add("yellow");

    }

    if(percent > 0.94){

        lights[4]?.classList.add("red");

    }

    if(percent > 0.98){

        lights.forEach(l=>l.classList.add("flash"));

    }

}

/*=========================================
            ANIMATION LOOP
=========================================*/

function animate(){

    updateGauges();

    updateMiniArc("fuelArc",fuelLevel);

updateMiniArc(
    "tempArcMini",
    ((coolantTemp-20)/100)*100
);

updateMiniArc(
    "oilArc",
    oilPressure/7*100
);

updateMiniArc(
    "voltArc",
    ((batteryVoltage-12)/3)*100
);

updateMiniNeedle("fuelNeedle", fuelLevel);

updateMiniNeedle(
    "tempNeedle",
    ((coolantTemp - 20) / 100) * 100
);

updateMiniNeedle(
    "oilNeedle",
    (oilPressure / 7) * 100
);

updateMiniNeedle(
    "voltNeedle",
    ((batteryVoltage - 12) / 3) * 100
);

    updateShiftLights();

    requestAnimationFrame(animate);

}

requestAnimationFrame(animate);

/*=========================================
            SVG ARC HELPERS
=========================================*/

function polar(cx,cy,r,a){

    a=(a-90)*Math.PI/180;

    return{

        x:cx+r*Math.cos(a),
        y:cy+r*Math.sin(a)

    };

}

function describeArc(cx,cy,r,start,end){

    const s=polar(cx,cy,r,end);
    const e=polar(cx,cy,r,start);

    const large=end-start<=180?0:1;

    return `
M ${s.x} ${s.y}
A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y}
`;

}

/*=========================================
            DRAW RED ARCS
=========================================*/

document
.getElementById("speedArc")
.setAttribute(
"d",
describeArc(
250,
250,
188,
210,
330
)
);

document
.getElementById("rpmArc")
.setAttribute(
"d",
describeArc(
250,
250,
188,
290,
330
)
);


/*=========================================
        MINI GAUGES
=========================================*/

function createMiniArc(id){

    const arc=document.getElementById(id);

    arc.setAttribute(

        "d",

        describeArc(
            110,
            110,
            70,
            210,
            330
        )

    );

}

createMiniArc("fuelArc");
createMiniArc("tempArcMini");
createMiniArc("oilArc");
createMiniArc("voltArc");

/*=========================================
        UPDATE MINI GAUGES
=========================================*/

function updateMiniArc(id,percent){

    percent=Math.max(0,Math.min(100,percent));

    const start=210;
    const end=start+(percent*120/100);

    document
    .getElementById(id)
    .setAttribute(

        "d",

        describeArc(
            110,
            110,
            70,
            start,
            end

        )

    );

}

function updateMiniNeedle(id, percent){

    percent = Math.max(0, Math.min(100, percent));

    const angle = -150 + (percent / 100) * 120;

    document.getElementById(id).style.transform =
        `rotate(${angle}deg)`;

}