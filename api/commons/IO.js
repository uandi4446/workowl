var IO = {}

IO.send = (ctx, data) => {
    var body = {};
    if (!!data) {
        body = data;
    }

    ctx.status = 200;

    ctx.body = JSON.stringify(body);
};

IO.error = (ctx, error, code) => {
    ctx.status = error.status || error.statusCode || 400;
    ctx.body = {
        message: Object.assign(error, code)
    }
}

module.exports = IO;