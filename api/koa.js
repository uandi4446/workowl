const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaJwt = require('koa-jwt');
const path = require('path');
const moment = require('moment');
moment.locale('ko');

require('dotenv').config({ path: path.join(__dirname, './.env') });

const router = require('./route.js');
const { isHasToken } = require('./commons/Auth.js');

const app = new Koa();

app.use(koaJwt({ secret: process.env.JWT_SECRET }).unless({
    path: [
        /^\/public/,
        /^\/api\/auth/,
        /^\/api\/users/
    ]
}));

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

module.exports = app;