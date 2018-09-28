const path = require('path');

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/api/hello', (ctx, next) => {
  ctx.body = { res: 'Hello React! I\'m api' };
});

app.use(router.routes());

app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500)
  .json(err.status? err:'Error');
});

module.exports = app;