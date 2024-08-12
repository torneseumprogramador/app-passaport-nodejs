// Capturando o evento de saída do processo
process.on('exit', (code) => {
  console.log(`Process exited with code: ${code}`);
});

// Capturando exceções não tratadas
process.on('uncaughtException', (err) => {
  console.log(`Uncaught exception: ${err.message}`);
  // Opcional: você pode encerrar o processo após capturar a exceção
  process.exit(1);  // Saindo com código 1 (indica erro)
});

// Exemplo de função que causa uma exceção não tratada
function causeError() {
  // Este código vai gerar um erro porque `undeclaredVariable` não foi definida
  console.log(undeclaredVariable);
}

// Chame a função que causará a exceção
causeError();

// Este código não será executado porque o processo será encerrado após a exceção
console.log('This will not be printed');
