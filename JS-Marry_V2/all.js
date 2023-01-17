//#region 宣告
let steps;
let lastRomdon = 0;
let time;
let timeCount = 60;
let speed = 800;
let scroe ;
//#endregion
//#region DOM
const burrows = document.querySelectorAll('.burrow');
const gophers = document.querySelectorAll('.gophers');
const btn_Start = document.querySelector('.btn-start');
const display_Time=document.querySelector('#time');
const display_Score =document.querySelector("#score");
//#endregion
//#region FUNCTION
function playGame() {
    steps=1000;
    scroe = 0;
    display_Score.innerText=scroe;
    go();
}

function go() {
    steps--;
    burrows[lastRomdon].classList.remove('active');
    gophers[lastRomdon].classList.remove('active');
    gophers[lastRomdon].dataset.type = 0;
    let random = getRandom(0, 8)
    burrows[random].classList.add('active');
    gophers[random].classList.add('active');
    gophers[random].dataset.type = 1;


    lastRomdon = random
    if (steps > 0) {
        setTimeout(go, speed);
    }
    else {
        burrows[lastRomdon].classList.remove('active');
        gophers[lastRomdon].classList.remove('active');
    }
}
function hit(e) {
    let count = e.target.dataset.type
    if (count == 1) {
        e.target.dataset.type = 0;
        scroe++;
        console.log(scroe);
        display_Score.innerText = scroe;
    }
}
function countdown() {
    btn_Start.disabled = true;
    timeCount--;
    if (timeCount > 0) {
        display_Time.innerText=timeCount;
        setTimeout(countdown, 1000)
    }
    else {
        steps = 0;
        display_Time.innerText=timeCount;
        alert('時間到了')
        btn_Start.disabled = false;
        timeCount=60;
        display_Time.innerText=timeCount;
    }

}
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//#endregion
//#region WINDOW ONLRAD
window.onload = function () {
    btn_Start.addEventListener('click', playGame);
    btn_Start.addEventListener('click', countdown);
    display_Time.innerText=timeCount;
    gophers.forEach(x => x.addEventListener('click', hit))

}

//#endregion