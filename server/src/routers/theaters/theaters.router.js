const express = require('express');
const { addTheaterController, getAllTheatersController } = require('./theaters.controller');
const theaterRouter = express.Router();
theaterRouter.post('/addtheater',addTheaterController);
theaterRouter.get('/getTheaters',getAllTheatersController);
module.exports = theaterRouter;