// dom
const list = document.querySelector('.list');
const send = document.querySelector('.send');
const key = 'agencyData';
//宣告
const type = {
    delete: "delete",
    edit: "edit",
    sure: "sure"
};
let data = JSON.parse(localStorage.getItem(key)) || [];
// windos-onload
window.onload = function () {
    todoListUp();
    send.addEventListener('click', seadData);
    list.addEventListener('click', checkData);
    list.addEventListener('click', editData);
    list.addEventListener('click', deleteData);

};
//加入列表，並同步更新網頁與 localstorage
function seadData(e) {
    let str = document.querySelector('.text').value;
    if (str === "") return;
    let text = {
        content: str,
        check: false
    };
    data.push(text);
    document.querySelector('.text').value = '';
    localStorage.setItem(key, JSON.stringify(data));
    todoListUp();
}
// 更新行事曆業面
function todoListUp() {
    let str = '';
    let len = data.length
    for (let i = 0; i < len; i++) {
        let check = data[i].check == true ? "checked" : " ";
        str += `<li class="w-50 mt-2 input-group">
            <div class="input-group-text">
                <input data-num=${i} class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" ${check}>
            </div>
            <input class="todoList form-control " type="text" readonly value="${data[i].content}">
            <button type="button" editList="edit" class="editList ms-2 btn btn-warning" data-num=${i} data-btnType=${type["edit"]} >編輯</button>
            <button type="button" deleteList class="deleteList ms-2 btn btn-danger" data-num=${i} data-btnType=${type["delete"]}>刪除</button>
        </li>`;
    }
    list.innerHTML = str;
};

// 刪除代辦事項
function deleteData(e) {
    let num = e.target.dataset.num;
    let str = e.target.dataset.btntype;
    if (str !== type["delete"]) return;
    data.splice(num, 1);
    localStorage.setItem(key, JSON.stringify(data));
    todoListUp();
};
//編輯代辦事項
function editData(e) {
    let str = e.target.dataset.btntype;
    if (str === type["edit"] || str === type["sure"]) {
        let num = e.target.dataset.num;
        let input = document.querySelectorAll('.todoList');
        let btnStr = "保存";
        if (str === type["edit"]) {
            input[num].removeAttribute('readonly');
            e.target.classList.remove('btn-warning');
            e.target.classList.add('btn-success');
            e.target.dataset.btntype = type["sure"];
        }
        else {
            data[num].content = input[num].value;
            e.target.dataset.btntype = type["edit"];
            e.target.classList.add('btn-warning');
            e.target.classList.remove('btn-success');
            btnStr = "編輯";
            localStorage.setItem(key, JSON.stringify(data));
        }
        e.target.innerText = btnStr;
    }
}
//勾選清單
function checkData(e) {
    let num = e.target.dataset.num;
    if (e.target.type !== "checkbox") return;
    data[num].check = e.target.checked;
    localStorage.setItem(key, JSON.stringify(data));
}