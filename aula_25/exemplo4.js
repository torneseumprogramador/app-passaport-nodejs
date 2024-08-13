process.on('exit', (code) => {
  console.log(`Process exited with code: ${code} =======`);
});

process.on('uncaughtException', (err) => {
  console.log(`Uncaught exception: ${err.message} ----`);
});


console.log(teste);
