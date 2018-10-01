const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const jwt = require('jsonwebtoken');
const moment = require('moment');
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
  } else if (!token) {
    next(Errors.UNAUTHORIZED);
  } else {
    Auth.verifyToken(token).then((decoded) => {
      ctx.req.user = decoded;
      next();
    }).catch((err) => {
      console.log(err);
      next(Errors.UNAUTHORIZED);
    });
  }
};

const signToken = (session) => {
  return jwt.sign({
    userId: session.userId,
    userName: session.name,
    expiredTime: moment().add(process.env.JWT_EXPIRES_HOUR, 'hours').format()
  },
  process.env.JWT_SECRET,
  { expiresIn: 60 * 60 * process.env.JWT_EXPIRES_HOUR }
  );
};

const isAuthenticated = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return error;
  }
};

const verifyToken = function(token) {
  return new Promise(function(resolve, reject) {
    if (!token) {
      const error = new Error('no token');
      reject(error);
    } else {
      var decoded = Auth.isAuthenticated(token);
      if(decoded.name) {
        const error = new Error('not verify');
        reject(error);
      } else {
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