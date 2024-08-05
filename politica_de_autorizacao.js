const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

function handlePolicies(policies) {
  return (req, res, next) => {
    if (policies.includes('PUBLIC')) {
      return next();
    }

    if(req.headers.authorization){
      const token = req.headers.authorization.split(' ')[1];
      const user = jwt.verify(token, 'secret');

      if (policies.includes(user.role)) {
        return next();
      }
    }

    res.status(403).send('Forbidden');
  };
}

app.get('/public', handlePolicies(['PUBLIC']), (req, res) => {
  res.send('Public Endpoint');
});

app.get('/user', handlePolicies(['USER']), (req, res) => {
  res.send('User Endpoint');
});

app.get('/admin', handlePolicies(['ADMIN']), (req, res) => {
  res.send('Admin Endpoint');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
