//#region 宣告
//餐廳資料
const restaurants = [
    {
        id: "1",
        img: "./pic/M.png",
        content: "麥當勞"
    },
    {
        id: "2",
        img: "./pic/KFC.png",
        content: "肯德基"
    },
    {
        id: "3",
        img: "./pic/BurgerKing.png",
        content: "漢堡王"
    },
    {
        id: "4",
        img: "./pic/CHINHUAJIAO.png",
        content: "青花驕麻辣鍋"
    },
    {
        id: "5",
        img: "./pic/HOTPOT.png",
        content: "川之流刷刷鍋"
    },
    {
        id: "6",
        img: "./pic/ilan.png",
        content: "一蘭拉麵"
    },
    {
        id: "7",
        img: "./pic/napoli.png",
        content: "拿坡里披薩"
    },
    {
        id: "8",
        img: "./pic/mos.png",
        content: "摩斯漢堡"
    },
    {
        id: "9",
        img: "./pic/ningxaia.png",
        content: "寧夏夜市"
    },
    {
        id: "10",
        img: "./pic/THAIYOWN.jpg",
        content: "瓦城泰式料理"
    },
    {
        id: "11",
        img: "./pic/taobanu.png",
        content: "陶板屋"
    },
    {
        id: "12",
        img: "./pic/TASTY.png",
        content: "西堤牛排"
    },
    {
        id: "13",
        img: "./pic/FORMOSA CHANG.png",
        content: "鬍鬚張滷肉飯"
    },
    {
        id: "14",
        img: "./pic/112.png",
        content: "十二鍋"
    },
    {
        id: "15",
        img: "./pic/INPARADISE.jpg",
        content: "饗饗"
    },
    {
        id: "16",
        img: "./pic/NOGOMI.png",
        content: "NOGOMI日式料理"
    }

]
//其他變數
let resCount=0;
let steps;
let stepsAll;
let speed;


//#endregion
//#region DOM
const eatBtn = document.querySelector('button');
const msg = document.querySelector('#msg');
let resLogos = document.querySelectorAll('[box-id]');
//#endregion
//#region function
function setResData() {
    // debugger
    resLogos.forEach(resLogo => {
        let id = resLogo.getAttributeNode('box-id').value;
        let data = restaurants.filter(x => x.id == id)[0];
        let img = document.createElement('img');
        img.classList.add('w-100')
        img.classList.add('h-100')
        img.src = data.img;
        resLogo.append(img);

    })
}

function letsGo() {
    speed = 100;
    steps = getRandom(1, 4) * resLogos.length + getRandom(0, 16);
    stepsAll = steps;
    turnGo()

}
function turnGo() {
    resLogos[resCount].classList.remove('active');
    resCount++;
    if (resCount >= resLogos.length) resCount = 0;
    resLogos[resCount].classList.add('active');
    steps--;
    if(steps>0){
        if(steps<Math.floor( stepsAll/3)) speed+=5
        setTimeout(turnGo,speed);
    }
    // else{
    //     let str =`<p>今晚吃<strong>${restaurants[resCount].content}</strong>!!</p>`
    //     msg.innerHTML=str;
    // }
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//#endregion
//#region window onload
window.onload = function () {
    setResData();
    eatBtn.addEventListener('click', letsGo)
}


//#endregion