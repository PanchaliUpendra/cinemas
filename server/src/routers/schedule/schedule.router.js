const express = require('express');
const { addNewScheduleController } = require('./schedule.controller');
const { getMovieScheduleData } = require('../../models/schedule.model/schedule.model');
const scheduleRouter = express.Router();
scheduleRouter.post('/addmovieschedule',addNewScheduleController);
scheduleRouter.get('/getmovieschedule/:movieid',getMovieScheduleData);
module.exports = scheduleRouter;