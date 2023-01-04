
//#region 變數
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'WednesDay', 'Thursday', 'Friday', 'Staurday'];
// let events = localStorage.getItem()
// const dt = new Date();
let nav=0;
//#endregion

//#region DOM
const tds = document.querySelectorAll('td');
const monthDisplay = document.querySelector('.monthDisplay');
const yearDisplay = document.querySelector('.yearDisplay');
// const fff =document.querySelector('[data-date]')
const backBtn = document.querySelector('.backBtn');
const nextBtn = document.querySelector('.nextBtn');
// const modal =document.querySelector('#staticBackdrop');

//#endregion
//#region 網頁初始化
window.onload = () => {
    load();
    initBtns();


};
//#endregion


//#region 函式
/**
 * 讀取日期 並為日歷加上日期
 * @date 2023-01-03
 * @returns {any}
 */
function load() {
    const dt = new Date();
    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const fistDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dateString = fistDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    yearDisplay.innerHTML = `${year}`;
    monthDisplay.innerHTML = `${month + 1}月`;
    const paddingDay = weekdays.indexOf(dateString.split(', ')[0]);

    tds.forEach(td => {
        td.innerHTML = "";
    });
    for (i = 1; i <= paddingDay + daysInMonth; i++) {
        if (i > paddingDay) {
            let str = `
            <h6 class="text-center fs-5">${i - paddingDay}
            </h6>
            <ul>
            </ul> `;
            tds[i - 1].innerHTML = str;
            tds[i - 1].setAttribute("data-date", `${year}-${(month + 1).toString().padStart(2,'0')}-${i.toString().padStart(2,'0')}`);
            tds[i - 1].setAttribute("style", `cursor: pointer`);
            tds[i - 1].setAttribute("data-bs-toggle", `modal`);
            tds[i - 1].setAttribute("data-bs-target", `#staticBackdrop`);
            tds[i - 1].addEventListener('click', (e) => {
                // console.log(e.target.dataset.date);
                document.querySelector('.modal-title').innerHTML=e.target.dataset.date;
                })
                
            }
        }
    }

    // console.log(daysInMonth);
    // console.log(paddingDay);



function initBtns() {
    nextBtn.addEventListener('click', () => {
        nav++;
        load();
    });
    backBtn.addEventListener('click', () => {
        nav--;
        load();
    });

}

//#endregion
