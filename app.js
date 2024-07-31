const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret',  // Certifique-se de substituir isso por uma chave secreta segura
};

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  // Simulando uma consulta de banco de dados
  const user = { id: jwt_payload.id }; // Aqui você deve buscar o usuário no banco de dados
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
});

passport.use(strategy);
app.use(passport.initialize());

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const payload = { id: email };  // Normalmente você usaria um ID de usuário do banco de dados aqui
    const token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.cookie('jwt', token, { httpOnly: true });
    res.json({ message: 'Login successful', token: token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Authenticated', user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
