// Acessando argumentos passados via linha de comando

// const args = process.argv;
// console.log('Arguments passed:', args);


const args = process.argv.slice(2); // Ignora os dois primeiros elementos
console.log('Arguments passed:', args);
