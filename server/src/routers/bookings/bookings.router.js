const express = require('express');
const { addNewTicketController, getEachUserBookingsController, getAllBookingsController } = require('./bookings.controller');
const bookingsRouter = express.Router();
bookingsRouter.post('/booktickets',addNewTicketController);
bookingsRouter.get('/getEachUserBookings/:userid',getEachUserBookingsController);
bookingsRouter.get('/getallbookings',getAllBookingsController);
module.exports = bookingsRouter;