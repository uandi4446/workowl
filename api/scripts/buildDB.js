/*
* buildDB.js
* DB 생성 및 기본 데이터 삽입을 위한 스크립트
*/
const Promise = require('bluebird');
const ObjectModels = require('../commons/ObjectModels.js');

const syncDB = () => {
    return Promise.each(Object.keys(ObjectModels), (key) => {
        return ObjectModels[key].sync();
    }, { concurrency: 1 });
}

syncDB().then(() => {
    console.log('Database Sync Complete.');
}).catch((err) => {
    console.log('Database sync Error.', err);
});   