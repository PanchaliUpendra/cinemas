const mongoose = require('mongoose');
const scheduleSchema = new mongoose.Schema({
    scheduleuid:String,
    moviename:String,
    movieuid:String,
    scheduletheater:String,
    theateruid:String,
    showtime:String,
    showdate:Date,
    ticketcost:Number,
    totaltickets:Number,
});

const scheduledatabase = mongoose.model('schedule',scheduleSchema);
module.exports = scheduledatabase;