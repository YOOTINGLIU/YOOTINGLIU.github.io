
const min = 0;
const max = 9;
let answerArr = []
setGame();
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);

}
function setGame() {
    do {
        let number = getRandomInt(min, max).toString();
        if (!answerArr.includes(number)) {
            answerArr.push(number);
        }
    }
    while (answerArr.length != 4);

}


let gusNumArr = ['5', '8', '9', '6']
let A;
let B;

gusNumArr.forEach(gusNum => {
    answerArr.forEach((ansNum) => {
        if (gusNum == ansNum) {
            B++;
        }
    })
})
for (let i = 0; i < 4; i++) {
    if (answerArr[i] == gusNumArr[i]) {
        A++;
    }
}
console.log(B-A);