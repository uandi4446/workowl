const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const jwt = require('jsonwebtoken');
const moment = require('moment');
const { ORM } = require('./Connection.js');
const ObjectModels = require('./ObjectModels.js');
const Errors = require('./Errors.js');

const exceptPath = [
    '/api/auth/token',
    '/api/auth/token/reflesh',
    '/api/users'
];

const isHasToken = (ctx, next) => {
    const token = ctx.req.headers['access-token'];

    if (exceptPath.indexOf(ctx.req.path) >= 0) {
        next();
    } else if (!!!token) {
        next(Errors.UNAUTHORIZED);
    } else {
        Auth.verifyToken(token).then((decoded) => {
            ctx.req.user = decoded;
            next();
        }).catch((err) => {
            next(Errors.UNAUTHORIZED);
        });
    }
};

const signToken = (session) => {
    return jwt.sign({
        userId: session.userId,
        expiredTime: moment().add(process.env.JWT_EXPIRES_HOUR, 'hours').format()
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
    );
};

const isAuthenticated = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return error;
    }
};

const verifyToken = function(token){
    return new Promise(function(resolve, reject) {
      if (!!!token)
        reject("no token");
      else {
        var decoded = Permission.isAuthenticated(token);
        if(decoded.name)
          reject("not verify");
        else {
          resolve(decoded);
        }
      }
    });
};

const Auth = {
    signToken,
    isAuthenticated,
    verifyToken,
    isHasToken
};

module.exports = Auth;