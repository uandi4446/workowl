const {
    ObjectModels,
    Errors,
    IO,
} = require('../commons/index.js');

module.exports = {
    "createUser": {
        path: '/api/users',
        method: 'post',
        action: async (ctx, next) => {
            const { User } = ObjectModels;

            const user = ctx.request.body;
            if (!!!user.id || !!!user.pwd || !!!user.name) {
                ctx.throw(400, Errors.BADREQUEST);
            }
            const id = user.id;
            const pwd = require('crypto')
                        .createHash('sha512')
                        .update(user.pwd)
                        .digest('hex')
                        .toUpperCase();
            const name = user.name;

            try {
                let userData = await User.create({
                    identity: id,
                    password: pwd,
                    name: name
                });

                IO.send(ctx);
            } catch (error) {
                IO.error(ctx, Errors.BADREQUEST, error);
            }
        }
    }
}