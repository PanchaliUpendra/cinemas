const express = require('express');
const { addNewScheduleController, getMovieScheduleController } = require('./schedule.controller');

const scheduleRouter = express.Router();
scheduleRouter.post('/addmovieschedule',addNewScheduleController);
scheduleRouter.get('/getmovieschedule/:movieid',getMovieScheduleController);
module.exports = scheduleRouter;