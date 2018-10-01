const moment = require('moment');
const {
  ObjectModels,
  Errors,
  IO,
} = require('../commons/index.js');

module.exports = {
  "creatWorkStart": {
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
}