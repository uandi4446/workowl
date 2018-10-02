/*
* destroyDB.js
* 기존 DB 삭제
*/
const Promise = require('bluebird');
const ObjectModels = require('../commons/ObjectModels.js');

const destroyDB = () => {
    return Promise.each(Object.keys(ObjectModels), (key) => {
        return ObjectModels[key].drop();
    }, { concurrency: 1 });
}

destroyDB().then(() => {
    console.log('Database Drop Complete.');
    process.exit();
}).catch((err) => {
    console.log('Database Drop Error.', err);
    process.exit(-1);
});