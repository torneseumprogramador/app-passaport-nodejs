const express = require('express');
const { Command } = require('commander');
const dotenv = require('dotenv');
const path = require('path');

const program = new Command();

// Definindo a opção de modo
program
  .option('--mode <mode>', 'Set the mode to development or production')
  .parse(process.argv);

const options = program.opts();

// Determinando o arquivo .env a ser carregado
let envFilePath;
if (options.mode === 'development') {
  envFilePath = path.resolve(__dirname, '.env.development');
} else if (options.mode === 'production') {
  envFilePath = path.resolve(__dirname, '.env.production');
} else {
  console.error('No valid mode specified. Use --mode development or --mode production');
  process.exit(2);
}

// Carregando o arquivo .env correto
dotenv.config({ path: envFilePath });

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send(`Running in ${process.env.ENVIRONMENT} mode on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server is running in ${process.env.ENVIRONMENT} mode on port ${port}`);
});
