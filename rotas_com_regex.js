const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//===== Aula 23 ===========
// app.get('/word/:word', function (req, res, next) {
//   res.send(req.params.word);
// });

// app.get('/word/:word([A-Za-z]+)', function (req, res, next) {
//   res.send(req.params.word);
// });

app.param('word', function (req, res, next, word) {
  // lógica para validar e processar o parâmetro `word`
  console.log(":::: aqui ::::")
  req.word = word;
  next();
});

app.get('/word/:word', function (req, res, next) {
  res.send(req.word);
});




//===== Aula 23 ===========

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Invalemail token' });
  } else {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
