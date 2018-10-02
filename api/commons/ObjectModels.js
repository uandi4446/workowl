/*
* ObjectModels.js
* DB 내 저장되는 데이터 구조 정의
* 회원 정보 : 아이디, 패스워드, 이름
* 설정 : 기본 출근 시간, 기본 퇴근 시간, 소속팀
* 기록 : 출근 시간, 퇴근 시간, 휴가여부, 외근여부, 계획여부
* >> false 인 경우 실제 출퇴근 기록. true 인 경우 출퇴근 계획
*/

const { ORM, oInstance } = require('./Connection.js');

const User = oInstance.define('user', {
    identity: {
        type: ORM.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: ORM.STRING,
        allowNull: false
    },
    name: {
        type: ORM.STRING,
        unique: true,
        allowNull: false
    }
});

const Schedule = oInstance.define('schedule', {
    date: {
        type: ORM.DATEONLY,
        allowNull: false
    },
    start: {
        type: ORM.DATE,
    },
    end: {
        type: ORM.DATE
    },
    isOutside: {
        type: ORM.BOOLEAN
    },
    isHoliday: {
        type: ORM.BOOLEAN
    },
    isPlan: {
        type: ORM.BOOLEAN
    }
});

const Setting = oInstance.define('setting', {
    startTime: {
        type: ORM.STRING
    },
    endTime: {
        type: ORM.STRING
    },
    team: {
        type: ORM.STRING
    }
});

// Setting relationship between tables
User.hasMany(Schedule, { as: 'schedule' });
Schedule.belongsTo(User);

User.hasOne(Setting);
Setting.belongsTo(User);

const ObjectModels = {
    User,
    Schedule,
    Setting
}

module.exports = ObjectModels;