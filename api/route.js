const Router = require('koa-router');
const Apis = require('./apis/Apis.js');

const router = new Router();

for (api in Apis) {
    router[Apis[api].method](
        Apis[api].path,
        Apis[api].preAction || (async (ctx, next) => { await next(); }),
        Apis[api].action
    );
}

module.exports = router;