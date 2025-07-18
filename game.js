const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let target = getTargetNum();
const startGame = 'Загадано число в диапазоне от 0 до 100';

console.log(startGame);

rl.on('line', (input) => {
  if (!isNaN(input)) {
    let userValue = parseInt(input);
    if (userValue === target) {
      victory(target);
    } else if (userValue > target) {
      console.log('Меньше');
    } else {
      console.log('Больше');
    }
  } else {
    console.log('Напишите число');
  }
});

function victory(number) {
  console.log(`Отгадано число ${number}`);
  console.log(startGame);
  target = getTargetNum();
}

function getTargetNum() {
  return Math.floor(Math.random() * 100);
}