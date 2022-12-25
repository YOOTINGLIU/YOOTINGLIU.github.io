//#region  變數
let carColorsArray;
let index = 0;
let time;
let color = 18;
//#endregion

//#region DOM
const trun_btn = document.querySelectorAll('.trun_btn');
const color_btn = document.querySelectorAll('.color_btn');
const img = document.querySelector('.pic').querySelector('img');
//#endregion

//#region onlond
window.onload = function () {
    changeCarColorSet(color)
    color_btn.forEach((btn) => btn.addEventListener('click', changeCarColor));
    trun_btn.forEach(btn => btn.addEventListener('mousedown', delayBtn))
    trun_btn.forEach(btn => btn.addEventListener('mouseup', function () {
        clearInterval(time);
    }))
    trun_btn.forEach(btn => btn.addEventListener('mouseout', function () {
        clearInterval(time);
    }))
};
//#endregion

//#region function
function delayBtn(e) {
    let trun = e.target.dataset.trun;
    time = setInterval(function () {
        turnCar(trun);
    }, 80);
}
function turnCar(trun) {
    if (trun === "left") {
        if (index <= 58) {
            index++;
        }
        else if (index == 59) {
            index = 0;
        }
    }
    else {
        if (index > 0) {
            index--;
        }
        else if (index == 0) {
            index = 59;
        }
    }
    img.src = carColorsArray[index];
}

function changeCarColor(e) {
    color = e.target.dataset.color;
    changeCarColorSet(color)
}
function changeCarColorSet(color) {
    carColorsArray = [];
    for (let i = 1; i < 61; i++) {
        let url = `./pic/360EXT_1_${color}_${i}.png`;
        carColorsArray.push(url);
    }
    img.src = carColorsArray[index];
}

//#endregion