//#region 變數
// let todoListArray = [
// {
//     id: '2023-01-02',
//     todolist: [
//         {
//             time: '18:00',
//             title: '做飯',
//             content: '做咖哩飯，牛排'
//         },
//         {
//             time: '19:00',
//             title: '看電視',
//             content: '看美劇'
//         },
//         {
//             time: '20:00',
//             title: '打電動',
//             content: '打魔獸，手游'
//         }
//     ]

// },
// {
//     id: '2023-01-05',
//     todolist: [
//         // {
//         //     time: '18:00',
//         //     title: '做飯',
//         //     content: '做咖哩飯，牛排'
//         // }
//     ]
// }
// ]// || JSON.parse(localStorage.getItem('locaData'));
let todoListArray=[];
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let date;
let nav = 0;
//#endregion

//#region DOM
const tds = document.querySelectorAll('td');
const monthDisplay = document.querySelector('.monthDisplay');
const yearDisplay = document.querySelector('.yearDisplay');
const backBtn = document.querySelector('.backBtn');
const nextBtn = document.querySelector('.nextBtn');
const staticBackdrop = document.querySelector('#staticBackdrop');
const exampleModal = document.querySelector('#exampleModal');
const addBtnschedule = document.querySelector('.addBtn')
const createBtn = document.querySelector('.createBtn');
const editBtn = document.querySelector('.editBtn');

//#endregion
//#region 網頁初始化
window.onload = () => {

    downLocalstorage()
    load();
    initBtns();

    addTodoListToClander()
    addBtnschedule.addEventListener('click', function () {
        titleDateTime()


    });
    // editBtn.addEventListener('click', function () {
    //     titleDateTime()

    // });
    createBtn.addEventListener('click', function () {
        // getTolistDOM()
        const todoListTime = document.querySelector(".todoListTime");
        const todoListTitle = document.querySelector(".todoListTitle");
        const todoListContent = document.querySelector(".todoListContent");
        let time = date;

        if (todoListTime.value == "" || todoListTitle.value == "" || todoListContent.value == "") {
            alert('輸入不可為空白');
            return;
        }
        let obj = {
            id: time,
            todolist: [
                {
                    time: todoListTime.value.toString(),
                    title: todoListTitle.value,
                    content: todoListContent.value
                }
            ]
        }
        let newArray = todoListArray.filter(x => x.id == time);
        if (newArray.length == 0) {
            todoListArray.push(obj);
        }
        else {
            todoListArray.forEach(x => {
                if (x.id == time) {
                    x.todolist.push({
                        time: todoListTime.value.toString(),
                        title: todoListTitle.value,
                        content: todoListContent.value
                    })
                }
            })
        }
        todoListTime.value = "";
        todoListTitle.value = "";
        todoListContent.value = "";
        upLocalstorage();
        addTodoListToClander();
        addModal1List(time)
    });
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
    tds.forEach(td => {
        td.removeEventListener;
        td.removeAttribute("data-date");
        td.removeAttribute("style", `cursor: pointer`);
        td.removeAttribute("data-bs-toggle", `modal`);
        td.removeAttribute("data-bs-target", `#staticBackdrop`);
    });
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
    let paddingDay = weekdays.indexOf(dateString.split(',')[0]);
    tds.forEach(td => {
        td.innerHTML = "";
    });

    let daydate = 1;
    for (i = 1; i <= paddingDay + daysInMonth; i++) {
        if (i > paddingDay) {
            let str = `
            <h6 class="text-center fs-5">${i - paddingDay}
            </h6>
            <div class="text">
            </div>
             `;
            tds[i - 1].innerHTML = str;
            tds[i - 1].setAttribute("data-date", `${year}-${(month + 1).toString().padStart(2, '0')}-${daydate.toString().padStart(2, '0')}`);
            daydate++;
            tds[i - 1].setAttribute("style", `cursor: pointer`);
            tds[i - 1].setAttribute("data-bs-toggle", `modal`);
            tds[i - 1].setAttribute("data-bs-target", `#staticBackdrop`);
            tds[i - 1].addEventListener('click', (e) => {
                date = e.target.dataset.date;
                let tempdata=date;
                addModal1List(tempdata);
            })
        }

    }
}


function titleDateTime() {
    let strDateTime = document.querySelector('.modal-title').innerText;
    document.querySelector('#exampleModalLabel').innerText = strDateTime;
    return strDateTime;
}

function initBtns() {
    nextBtn.addEventListener('click', () => {
        nav++;
        load();
    addTodoListToClander();

        // addTodoListToClander();
        // addModal1List(time)
    });
    backBtn.addEventListener('click', () => {
        nav--;
        load();
    addTodoListToClander();

    });

}
/**
 * 描述 將資料庫內容顯示在主要行事曆上
 * @date 2023-01-06
 * @returns {any}
 */
function addTodoListToClander() {
    todoListArray.forEach(todolist => {
        tds.forEach(td => {
            if (td.dataset.date == todolist.id) {
                let text = td.querySelector('.text');
                text.innerHTML = "";
                todolist.todolist.forEach(todo => {
                    text.innerHTML += `
                    <div>${todo.time}: ${todo.title}
                    </div>`
                })
            }
        })
    })
}
/**
 * 描述 第一層筆記帶入樣式以及按鈕
 * @date 2023-01-06
 * @param {any} listArray 當日陣列資料
 * @returns {any}
 */
function modal_bodyAddlist(listArray) {
    let modal_body = document.querySelector('.modal-body')
    modal_body.innerHTML = ' ';
    listArray.forEach((list, index) => {
        modal_body.innerHTML += ` <div class="todolist border rounded-1 border-secondary p-2 mb-4">
        <div class="title fs-4 mb-2 d-flex justify-content-between">
            <p>${list.title}</p>
            <div class="edit-btns">
                <button type="button" class="fs-6 btn btn-danger deleteBtn " data-index="${index}">刪除</button>
              
            </div>
        </div>
        <div class="time mb-2">時間: ${list.time}</div>
        <div class="content">${list.content}</div>
    </div>`;
    // <button type="button" class="fs-6 btn btn-primary editBtn ">編輯</button>
    })
}

/**
 * 描述 刷新第一層筆記
 * @date 2023-01-06
 * @param {any} date 帶入日期
 * @returns {any}
 */
function addModal1List(date) {
    document.querySelector('.modal-title').innerText = date;
    let listArray = todoListArray.filter(x => x.id == date)[0];
    let modal_body = document.querySelector('.modal-body')
    modal_body.innerHTML = "";
    if (listArray === undefined || listArray === null) return;
    modal_bodyAddlist(listArray.todolist);

    let deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach(deleteBtn => deleteBtn.addEventListener('click', function (e) {
        let index = e.target.dataset.index;
        listArray.todolist.splice(index, 1)
        modal_bodyAddlist(listArray.todolist);
        upLocalstorage();
        addTodoListToClander()
    }))
}


/**
 * 描述 取得新增/編輯裡面DOM
 * @date 2023-01-06
 * @returns {any}
 */
function getTolistDOM() {
    let todoListTime = document.querySelector(".todoListTime").value;
    let todoListTitle = document.querySelector(".todoListTitle").value;
    let todoListContent = document.querySelector(".todoListContent").value;
}

/**
 * 描述 將資料上傳至loca
 * @date 2023-01-06
 * @returns {any}
 */
function upLocalstorage() {
    localStorage.removeItem('locaData');
    let dataStr = JSON.stringify(todoListArray);
    localStorage.setItem('locaData', dataStr);
}
/**
 * 描述 將loca下載至本地端
 * @date 2023-01-06
 * @returns {any}
 */
function downLocalstorage() {
    let datastr = localStorage.getItem('locaData') === null ? JSON.stringify([{ id: '2023-01-05', todolist: []},{ id: '2023-01-06', todolist: []}]) : localStorage.getItem('locaData');
    // debugger
    todoListArray = JSON.parse(datastr);
    upLocalstorage()
}

//#endregion
