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
            const { User, Setting } = ObjectModels;

            const user = ctx.request.body;
            console.log(ctx.request);
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
            const startTime = user.startTime;
            const endTime = user.endTime;

            try {
                const userData = await User.create({
                    identity: id,
                    password: pwd,
                    name: name,
                    setting: {
                        startTime: startTime,
                        endTime: endTime
                    }
                }, {
                    include: [ Setting ]
                });
            } catch (error) {
                IO.error(ctx, Errors.BADREQUEST, error);
            }

            IO.send(ctx);
        }
    }
}