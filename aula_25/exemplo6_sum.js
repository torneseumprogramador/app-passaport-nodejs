// sum.js
process.on('message', (msg) => {
  const result = msg.num1 + msg.num2;
  process.send(result);
});
