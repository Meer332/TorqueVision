/*==================================
        REVHEADZ SOUND SYSTEM
==================================*/

// ---------- Sounds ----------
const startSound = new Audio("sounds/start.mp3");
const stopSound = new Audio("sounds/stop.mp3");

const idleSound = new Audio("sounds/idle.mp3");
const lowSound = new Audio("sounds/low.mp3");
const midSound = new Audio("sounds/mid.mp3");
const highSound = new Audio("sounds/high.mp3");

const shiftSound = new Audio("sounds/shift.mp3");
const backfireSound = new Audio("sounds/backfire.mp3");

// ---------- Looping Sounds ----------
[idleSound, lowSound, midSound, highSound].forEach(sound => {

    sound.loop = true;
    sound.volume = 0;

});

// ---------- Flags ----------
let soundStarted = false;

// ---------- Start Engine ----------
function startEngineSounds(){

    if(soundStarted) return;

    soundStarted = true;

    startSound.currentTime = 0;
    startSound.play();

    idleSound.play();
    lowSound.play();
    midSound.play();
    highSound.play();

}

// ---------- Stop Engine ----------
function stopEngineSounds(){

    if(!soundStarted) return;

    soundStarted = false;

    stopSound.currentTime = 0;
    stopSound.play();

   [idleSound, lowSound, midSound, highSound].forEach(sound => {

    sound.volume = 0;

    setTimeout(() => {

        sound.pause();
        sound.currentTime = 0;

    }, 250);

});
}
function updateEngineSound(){

    if(!engineOn) return;

    const p = Math.min(1, rpm / maxRPM);

    /*==========================
            VOLUME
    ==========================*/

    idleSound.volume =
        Math.max(0, Math.min(1, 1 - p * 3.8));

    lowSound.volume =
        Math.max(0, Math.min(1,
        1 - Math.abs(p - 0.28) * 4));

    midSound.volume =
        Math.max(0, Math.min(1,
        1 - Math.abs(p - 0.58) * 4));

    highSound.volume =
        Math.max(0, Math.min(1,
        1 - Math.abs(p - 0.90) * 6));

    /*==========================
        PLAYBACK RATE
    ==========================*/

    idleSound.playbackRate =
        0.90 + p * 0.18;

    lowSound.playbackRate =
        0.90 + p * 0.28;

    midSound.playbackRate =
        0.92 + p * 0.38;

    highSound.playbackRate =
        0.96 + p * 0.48;

}