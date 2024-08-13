const express = require('express');
const { Command } = require('commander');
const program = new Command();

// Definindo as opções de linha de comando
program
  .option('-d, --debug', 'output extra debugging')
  .option('-p, --port <number>', 'set port number', '3000')
  .option('-e, --env <string>', 'o ambiente', 'development')
  .parse(process.argv);

const options = program.opts();

console.log(options)

// Criando a aplicação Express
const app = express();

if (options.debug) {
  console.log('Debugging enabled');
}

// Definindo uma rota simples
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Inicializando o servidor na porta definida
const port = options.port;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
