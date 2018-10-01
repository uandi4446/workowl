const Users = require('./Users.js');
const Auth = require('./Auth.js');

module.exports = Object.assign(
    Users,
    Auth
);