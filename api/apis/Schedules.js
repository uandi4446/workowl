const moment = require('moment');
const Op = require('sequelize').Op;

const {
  ObjectModels,
  Errors,
  IO,
} = require('../commons/index.js');

module.exports = {
  'creatWorkStart': {
    path: '/api/schedules/start',
    method: 'post',
    action: async (ctx, next) => {
      const { Schedule } = ObjectModels;

      const user = ctx.state.user;

      const start = moment().format();

      try {
        const startData = await Schedule.create({
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
      const end = moment().format();

      try {
        const todayStart = moment().startOf('day');
        const todayEnd = moment().endOf('day');
        const schedule = await Schedule.findOne({
          where: {
            userId: user.userId,
            isPlan: false,
            start: { 
              [Op.and]: {
                [Op.ne]: null,
                [Op.between]: [todayStart, todayEnd]
              } 
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

      const todayStart = moment().startOf('day');
      const todayEnd = moment().endOf('day');

      try {
        var schedule = await Schedule.findOrCreate({
          where: {
            userId: user.userId,
            isPlan: false,
            start: { 
              [Op.and]: {
                [Op.ne]: null,
                [Op.between]: [todayStart, todayEnd]
              } 
            }
          }
        }, defaults: {
          userId: user.userId,
          isPlan: false,
          start: null,
          end: null,
          isOutside: true
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

      try {
        const todayStart = moment().startOf('day');
        const todayEnd = moment().endOf('day');

        const schedule = await Schedule.findOne({
          userId: user.userId,
          isPlan: false,
          start: { 
            [Op.and]: {
              [Op.between]: [todayStart, todayEnd]
            } 
          }
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

      try {
        const todayStart = moment().startOf('day');
        const todayEnd = moment().endOf('day');

        var schedule = await Schedule.findOne({
          userId: user.userId,
          isPlan: true,
          start: { 
            [Op.and]: {
              [Op.between]: [todayStart, todayEnd]
            } 
          }
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
            }, attributes: [ 'startTime', 'endTime' ];
          });
        } catch (error) {
          console.log("find Setting Error: ", error);
          IO.error(ctx, Errors.BADREQUEST);
        }
      }

      if (!schedule) {
        schedule = {
          start: moment(schedule.startTime, 'HH:mm').format(),
          end: moment(schedule.endTime, 'HH:mm').format()
        };
      }

      IO.send(ctx, schedule);
    }
  }
}