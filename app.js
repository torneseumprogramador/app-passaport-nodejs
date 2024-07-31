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
  secretOrKey: 'coder-house-secret',
};

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  const users = [
    { email: 'admin@example.com', role: 'admin' },
    { email: 'user@example.com', role: 'user' },
  ];
  const user = users.find(user => user.email === jwt_payload.email);
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
  const users = [
    { email: 'admin@example.com', role: 'admin', password: 'password' },
    { email: 'user@example.com', role: 'user', password: 'password' },
  ];
  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    const payload = { email: user.email, role: user.role };
    const token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.cookie('jwt', token, { httpOnly: true });
    res.json({ message: 'Login successful', token: token });
  } else {
    res.status(401).json({ message: 'Invalemail credentials' });
  }
});

const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbemailden' });
      }
      next();
    }
  ];
};

app.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Current Authenticated', user: req.user });
});

app.get('/admin', authorize(['admin']), (req, res) => {
  res.json({ message: 'Admin content', user: req.user });
});

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
