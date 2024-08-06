const express = require('express');

class CustomRouter {
  constructor() {
    this.router = express.Router();
  }

  applyCallbacks(route, callbacks) {
    callbacks.forEach(callback => {
      this.router[route.method](route.path, callback);
    });
  }

  getRouter() {
    return this.router;
  }
}

class MyRouter extends CustomRouter {
  constructor() {
    super();
  }

  init() {
    this.applyCallbacks(
      {
        method: 'get',
        path: '/' 
      },
      [
        (req, res) => {
          res.send('Hello, world!')
        }
      ]
    );

    this.applyCallbacks(
      {
        method: 'get',
        path: '/dados' 
      },
      [
        (req, res) => {
          res.json([
            {nome: "teste1"},
            {nome: "teste2"},
          ])
        }
      ]
    );
  }
}

const myRouter = new MyRouter();
myRouter.init();

const app = express();
app.use('/api', myRouter.getRouter());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
