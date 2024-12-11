const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    moviename:String,
    movieuid:String,
    movieimgurl:String,
    moviedes:String,
    movietype:String,
    moviedur:Number,
    movietktcost:Number
});

const moviedatabase = mongoose.model('movies',moviesSchema);
module.exports = moviedatabase;