let todoListArray = [
    {
        id: '2023-01-02',
        todolist: [
            {
                time: '18:00',
                title: '做飯',
                content: '做咖哩飯，牛排'
            },
            {
                time: '19:00',
                title: '看電視',
                content: '看美劇'
            },
            {
                time: '20:00',
                title: '打電動',
                content: '打魔獸，手游'
            }
        ]

    },
    {
        id: '20230105',
        todolist: [
            {
                time: '18:00',
                title: '做飯',
                content: '做咖哩飯，牛排'
            }
        ]

    },

]


let list = [
    { name: '啤酒', type: '喝的' },
    { name: '汽水', type: '喝的' },
    { name: '火鍋', type: '吃的' },
    { name: '燒烤', type: '吃的' },
    { name: '冰淇淋', type: '吃的' }
]

//找到第一個吃的
{
    let r1 = list.find(x => x.type == "吃的");
    console.log(r1)
}
//找所有吃的東西
{
    let r2 = list.filter(x => x.type == "吃的");
    console.log(r2);
}
//找冰淇淋在那裏
let y
let r3 = list.map((x, index) => {
    if (x.name == "冰淇淋") {
        y = index

    }
});
console.log(y);

//用list 產生新的集合
//["啤酒","汽水",]

let r4 = list.map(x => x.name)
console.log(r4)

//用list產生新的集合
// [
//     {id:5,name:"啤酒"},
//     {id:4,name:"汽水"},
//     {id:3,name:"火鍋"},
//     {id:2,name:"燒烤"},
//     {id:1,name:"冰淇淋"},
// ]

let r5 = list.map((x, idx) => {
    return {
        id: list.length - idx,
        name: x.name
    }
})
let r5_1 = list.map((x, idx) => ({
    id: list.length - idx,
    name: x.name
}))
//排序
let num_1 = [9, 6, 4, 2, 1]
let r6 = num_1.sort((a, b) => a - b);
console.log(r6);

let num_2 = [10000, 10, 100, 1, 101]
let r7 = num_2.sort((a, b) => a - b);
console.log(r7);

//r5 用ID排序 由小到大

let r8 = r5.sort((a, b) => a.id - b.id);
console.log(r8);

// 12生肖排序
let animal = ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'];

let animal2 = ['豬', '龍', '鼠', '狗', '羊', '雞', '馬'];

let r9 = animal2.sort((a, b) => (animal.indexOf(a)) - (animal.indexOf(b)));

console.log(r9);

//我要用list分群 吃的一群 喝的一群

//自訂義 groupBY
Array.prototype.groupBy = function (prop) {
    return this.reduce((groups, item)=> {
        const val = item[prop];
        groups[val]=groups[val]||[],
        groups[val].push(item);
        return groups;
    },{})
}

let r10 =list.groupBy("type");
console.log(r10);