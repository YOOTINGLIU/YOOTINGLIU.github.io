//#region 變數
let min_num = 1;
let max_num = 100;
let gusse_num = getRandomNum(min_num, max_num);
//#endregion

//#region  DOM
const display_range = document.querySelector('.display-range');
const num_input = document.querySelector('.num-input');
const num_btn = document.querySelector('.btn');
const num_btnAll = document.querySelectorAll(' .num-btn');
const reset_btn = document.querySelector('.reset');
const gusse_btn = document.querySelector('.gusse');
//#endregion


//#region 監聽事件
// num_btn.addEventListener('click', GetNum);//數字按鈕顯示到輸入密碼框
num_btnAll.forEach(e => e.addEventListener('click', getNum));//數字按鈕顯示到輸入密碼框
gusse_btn.addEventListener('click', guseeNum);//猜測數字
reset_btn.addEventListener('click', resetGame);//reset
//#endregion


//#region 函式
function getNum(e) {//取得數字按鈕
    let str = e.target.textContent;
    if (num_input.value.length < 2)
        num_input.value += str;
}
function getNum1(e) {//先棄置不用不夠好
    e.stopPropagation();
    let str = e.target.textContent;

    if (str == '猜' || str == 'reset' || str.length > 2) {
        return;
    }
    else {
        console.log(str);
        if (num_input.value.length < 2)
            num_input.value += str;
    }
}
function guseeNum(e) {//猜數
    let num = parseInt(num_input.value, 10);
    if (num > gusse_num && num < max_num) {
        max_num = num;
    }
    else if (num < gusse_num && num > min_num) {
        min_num = num;
    }
    else if (num == gusse_num) {
        alert("答對了 恭喜喔");
        alert("再玩一次吧!");
        resetGame();
        // display_range.value = "答對!";
    }
    display_range.value = `${min_num}-${max_num}`;
    num_input.value = "";
}

function getRandomNum(min, max) {//產生亂數
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
};

function resetGame() {
    min_num = 1;
    max_num = 100;
    display_range.value = `${min_num}-${max_num}`;
    gusse_num = getRandomNum(min_num, max_num);
    num_input.value = ""
}
//#endregion