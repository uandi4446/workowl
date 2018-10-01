const {
    ObjectModels,
    Errors,
    IO,
    Auth
} = require('../commons/index.js');

module.exports = {
    "createToken": {
        path: '/api/auth',
        method: 'post',
        action: async (ctx, next) => {
            const { User } = ObjectModels;

            const user = ctx.request.body;
            const id = user.id;
            const pwd = require('crypto')
                        .createHash('sha512')
                        .update(user.pwd)
                        .digest('hex')
                        .toUpperCase();

            const user = await User.findOne({
                where: {
                    id: id,
                    pwd: pwd
                }
            });

            if (!user) {
                IO.error(ctx, Errors.BADREQUEST);
            } else {
                const token = await Auth.signToken({ userId: user.id });
                IO.send(ctx, { token: token });
            }
        }
    }
}