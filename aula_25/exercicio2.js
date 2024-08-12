const { fork } = require('child_process');
const express = require('express');
const app = express();

let visits = 0;

app.get('/', (req, res) => {
    visits += 1;
    res.send(`Total visits: ${visits}`);
});

app.get('/calculo-bloq', (req, res) => {
    let sum = 0;
    for (let i = 0; i <= 1000000000; i++) {
        sum += i;
        // console.log(i);
    }
    res.send(`Blocked calculation result: [${sum}]`);
});

app.get('/calculo-nobloq', (req, res) => {
    const child = fork('./exercicio2_calculation.js');
    child.on('message', (sum) => {
        res.send(`Non-blocked calculation result: ${sum}`);
    });
    child.send('start');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
