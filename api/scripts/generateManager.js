const { oInstance } = require('../commons/Connection.js');
const ObjectModels = require('../commons/ObjectModels.js');

module.exports = (plop) => {
    var manager = {};

    plop.setActionType('insert', (answers, config, plop) => {
        console.log(answers);
        const { User } = ObjectModels;
        const password = require('crypto')
                        .createHash('sha512')
                        .update(answers.password)
                        .digest('hex')
                        .toUpperCase();
        
        return User.create({
            identity: answers.id,
            password: password,
            name: answers.managerName
        }).then((user) => {
            console.log('Manager is added!');
        }).catch((err) => {
            console.log('Error: ', err);
        });
    });

    plop.setGenerator('manager', {
        description: '서비스 운영 전 관리자 생성을 수행하여야 합니다.',
        prompts: [{
            type: 'input',
            name: 'id',
            message: '관리자의 아이디를 입력해 주세요.'
        }, {
            type: 'input',
            name: 'password',
            message: '관리자 계정의 비밀번호를 입력해 주세요.'
        }, {
            type: 'input',
            name: 'managerName',
            message: '관리자의 이름을 입력해 주세요.',
        }],
        actions: [{
            type: 'insert',
            speed: 'slow'
        }]
    });
}