const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

// Classe CustomRouter para criar um roteador personalizado
class CustomRouter {
  constructor() {
    this.router = express.Router();
  }

  handlePolicies(policies) {
    return (req, res, next) => {
      if (policies.includes('PUBLIC')) {
        return next();
      }

      const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(401).send('Unauthorized');
      }

      try {
        const user = jwt.verify(token, 'secret'); // 'secret' deve ser substituído pela chave secreta real
        if (policies.includes(user.role)) {
          return next();
        } else {
          return res.status(403).send('Forbidden');
        }
      } catch (err) {
        return res.status(403).send('Forbidden');
      }
    };
  }

  generateCustomResponses(req, res, next) {
    res.sendSuccessMessage = (message) => res.status(200).send({ success: true, message });
    res.sendError = (message) => res.status(400).send({ success: false, message });
    res.sendSuccessPayload = (payload) => res.status(200).send({ success: true, data: payload });
    next();
  }

  get(path, policies, ...callbacks) {
    this.router.get(path, this.handlePolicies(policies), this.generateCustomResponses, ...callbacks);
  }

  post(path, policies, ...callbacks) {
    this.router.post(path, this.handlePolicies(policies), this.generateCustomResponses, ...callbacks);
  }

  put(path, policies, ...callbacks) {
    this.router.put(path, this.handlePolicies(policies), this.generateCustomResponses, ...callbacks);
  }

  delete(path, policies, ...callbacks) {
    this.router.delete(path, this.handlePolicies(policies), this.generateCustomResponses, ...callbacks);
  }

  getRouter() {
    return this.router;
  }
}

// Instanciando o CustomRouter
const customRouter = new CustomRouter();

// Endpoint de login para gerar tokens JWT
customRouter.post('/login', ['PUBLIC'], (req, res) => {
  const { username, role } = req.body;
  const token = jwt.sign({ username, role }, 'secret'); // 'secret' deve ser substituído pela chave secreta real
  res.sendSuccessPayload({ token });
});

// Endpoint público
customRouter.get('/public', ['PUBLIC'], (req, res) => {
  res.sendSuccessMessage('Public Endpoint');
});

// Endpoint para usuários
customRouter.get('/user', ['USER'], (req, res) => {
  res.sendSuccessMessage('User Endpoint');
});

// Endpoint para administradores
customRouter.get('/admin', ['ADMIN'], (req, res) => {
  res.sendSuccessMessage('Admin Endpoint');
});

// Adicionando o roteador personalizado ao app
app.use('/', customRouter.getRouter());

// Iniciando o servidor
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
