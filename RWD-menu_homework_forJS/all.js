//#region 變數
let sonBool = [false, false, false, false, false];

//#endregion

//#region DOM
const son_nav_lab = document.querySelectorAll('.son-nav-lab');
const son_nav = document.querySelectorAll('.son-nav');

//#endregion
//#region 監聽
son_nav_lab.forEach(x => x.addEventListener('click', addSonNav));

//#endregion

//#region 函式
function addSonNav(e) {
    let num = Number(e.target.dataset.num);
    if (!sonBool[num]) {
        son_nav[num].setAttribute("style", "display: block;");
        son_nav_lab[num].setAttribute("style", "transform: rotate(0.25turn);");
        sonBool[num] = true;
    }
    else {
        son_nav[num].removeAttribute("style", "display: block;")
        son_nav_lab[num].removeAttribute("style", "transform: rotate(0.25turn);");
        sonBool[num] = false;
    }

}
//#endregion