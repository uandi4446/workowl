const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

// const router = require('./route.js');
const Router = require('koa-router');
const router = new Router();
const { isHasToken } = require('./commons/Auth.js');

const app = new Koa();

// app.use(isHasToken);
app.use(bodyParser());
// app.use(router.routes()).use(router.allowedMethods());
router.post('/api/users', async (ctx,next) => {
  await next();
  ctx.body = 'hello world';
  console.log(ctx.status);
});

app.use(router.routes()).use(router.allowedMethods());

module.exports = app;