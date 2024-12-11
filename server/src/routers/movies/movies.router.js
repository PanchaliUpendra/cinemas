const express = require('express');
const { addMovieController, getMovieController, getEachmovieController } = require('./movies.controller');
const moviesRouter = express.Router();
moviesRouter.post('/addmovie',addMovieController);
moviesRouter.get('/getmovies',getMovieController);
moviesRouter.get('/geteachmovie/:movieid',getEachmovieController);
module.exports = moviesRouter;