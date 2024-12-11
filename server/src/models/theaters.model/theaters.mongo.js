const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
    theateruid:String,
    theatername:String,
    theartershows:Number,
    theateraddress:String,
    theaterseats:Number
});

const theaterdatabase = mongoose.model('theaters',theaterSchema);
module.exports = theaterdatabase;
