const { fork } = require('child_process');

const child = fork('./exemplo6_sum.js');

child.on('message', (result) => {
    console.log(`Sum result: ${result}`);
});

child.send({ num1: 5, num2: 10 });
