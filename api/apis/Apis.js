const Users = require('./Users.js');
const Auth = require('./Auth.js');
const Schedules = require('./Schedules.js');

module.exports = Object.assign(
  Users,
  Auth,
  Schedules
);