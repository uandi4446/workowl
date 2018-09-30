const ORM = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const oInstance = new ORM('Workowl', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    },
    timezone: '+09:00'
});

const Connection = {
    ORM: ORM,
    oInstance: oInstance
}

module.exports = Connection;