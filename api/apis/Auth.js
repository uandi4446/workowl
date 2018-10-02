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

            const userData = await User.findOne({
                where: {
                    identity: id,
                }
            });
            if (!userData) {
                IO.error(ctx, Errors.UNAUTHORIZED, Errors.Codes.FAILTOLOGIN);
            } else if (userData.password === pwd) {
                const token = await Auth.signToken({ 
                    userId: userData.id,
                    name: userData.name
                });
                IO.send(ctx, { token: token });
            } else if (userData.password !== pwd) {
                IO.error(ctx, Errors.UNAUTHORIZED, Errors.Codes.FAILTOLOGIN);
            } else {
                IO.error(ctx, Errors.BADREQUEST);
            }
        }
    }
}