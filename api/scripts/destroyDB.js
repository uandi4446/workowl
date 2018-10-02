/*
* destroyDB.js
* 기존 DB 삭제
*/
const { oInstance } = require('../commons/Connection.js');

oInstance.dropAllSchemas().then(() => console.log('Database destroyed.'))
    .catch((err) => console.log(err));