const mongoose = require('mongoose');
const bookingsSchema = new mongoose.Schema({
    userid:String,
    bookinguid:String,
    moviename:String,
    theatername:String,
    theateruid:String,
    movieimgurl:String,
    movieuid:String,
    ticketcost:Number,
    totaltickets:Number,
    date:String,
    starttime:String,
    endtime:String,
    moviedes:String,
    moviedur:Number,
    movietype:String,
    useremail:String,
    username:String
});

const bookingsdatabase = mongoose.model('bookings',bookingsSchema);
module.exports = bookingsdatabase;