const moment = require('moment-timezone');
const Op = require('sequelize').Op;

const {
  ObjectModels,
  Errors,
  IO,
} = require('../commons/index.js');

const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'HH:mm';

module.exports = {
  'creatWorkStart': {
    path: '/api/schedules/start',
    method: 'post',
    action: async (ctx, next) => {
      const { Schedule } = ObjectModels;

      const user = ctx.state.user;

      const todayDate = moment().tz('Asia/Seoul').format(dateFormat);
      const start = moment().tz('Asia/Seoul').format(timeFormat);

      try {
        const startData = await Schedule.create({
          date: todayDate,
          start: start,
          isOutside: false,
          isHoliday: false,
          isPlan: false,
          userId: user.userId
        });
        
        IO.send(ctx, startData);
      } catch (error) {
        IO.error(ctx, Errors.BADREQUEST, error);    
      }
    }
  },
  'createWorkEnd': {
    path: '/api/schedules/end',
    method: 'post',
    action: async (ctx, next) => {
      const { Schedule } = ObjectModels;

      const user = ctx.state.user;

      const todayDate = moment().tz('Asia/Seoul').format(dateFormat);
      const end = moment().tz('Asia/Seoul').format(timeFormat);

      try {
        const schedule = await Schedule.findOne({
          where: {
            userId: user.userId,
            date: todayDate,
            isPlan: false,
            start: { 
              [Op.ne]: null
            }
          }
        });

        if (!schedule) {
          IO.error(ctx, Errors.BADREQUEST, Errors.Codes.NOCONTENTS);
        } else {
          await schedule.update({
            end: end
          });

          IO.send(ctx);
        }
      } catch (error) {
        console.log(error);
        IO.error(ctx, Errors.BADREQUEST);
      }
    }
  },
  'createWorkOutside': {
    path: '/api/schedules/outside',
    method: 'post',
    action: async (ctx, next) => {
      const { Schedule } = ObjectModels;

      const user = ctx.state.user;

      const todayDate = moment().tz('Asia/Seoul').format(dateFormat);

      try {
        var schedule = await Schedule.findOrCreate({
          where: {
            userId: user.userId,
            isPlan: false,
            date: todayDate
          }, defaults: {
          userId: user.userId,
          date: todayDate,
          isPlan: false,
          start: null,
          end: null,
          isOutside: true
          }
        });

        IO.send(ctx, schedule);
      } catch (error) {
        IO.error(ctx, Errors.BADREQUEST);
      }
    }
  },
  'readTodayWork': {
    path: '/api/schedule/today',
    method: 'get',
    action: async (ctx, next) => {
      const { Schedule } = ObjectModels;

      const user = ctx.state.user;
      const todayDate = moment().tz('Asia/Seoul').format(dateFormat);

      try {
        const schedule = await Schedule.findOne({
          userId: user.userId,
          date: todayDate,
          isPlan: false,
        });

        IO.send(ctx, schedule);
      } catch (error) {
        console.log(error);
        IO.error(ctx, Errors.BADREQUEST);
      }
    }
  },
  'readTodayPlan': {
    path: '/api/schedule/plan',
    method: 'get',
    action: async (ctx, next) => {
      const { Schedule, Setting } = ObjectModels;

      const user = ctx.state.user;
      const todayDate = moment().tz('Asia/Seoul').format(dateFormat);

      try {
        var schedule = await Schedule.findOne({
          userId: user.userId,
          date: todayDate,
          isPlan: true,
        });
      } catch (error) {
        console.log(error);
        IO.error(ctx, Errors.BADREQUEST);
      }

      if (!schedule) {
        try {
          schedule = await Setting.findOne({
            where: {
              userId: user.userId
            }, attributes: [ 'startTime', 'endTime' ]
          });
        } catch (error) {
          console.log("find Setting Error: ", error);
          IO.error(ctx, Errors.BADREQUEST);
        }
      }

      if (!schedule) {
        schedule = {
          start: startTime,
          end: endTime
        };
      }

      IO.send(ctx, schedule);
    }
  },
  'readTeamSchedule': {
    path: '/api/schedule/team',
    method: 'get',
    action: async (ctx, next) => {
      const { Schedule, User } = ObjectModels;

      const user = ctx.state.user;
      const todayDate = moment().tz('Asia/Seoul').format(dateFormat);

      try {
        const schedules = await Schedule.findAll({
          where: {
            userId: {
              [Op.ne]: user.userId
            },
            date: todayDate,
            isPlan: false
          }, include: [{
            model: User,
            attributes: [ 'id', 'name' ]
          }]
        });

        IO.send(ctx, schedules);
      } catch (error) {
        console.log(error);
        IO.error(ctx, Errors.BADREQUEST);
      }
    }
  }
}