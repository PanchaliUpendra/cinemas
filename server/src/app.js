const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const theaterRouter = require('./routers/theaters/theaters.router');
const usersRouter = require('./routers/users/users.router');
const moviesRouter = require('./routers/movies/movies.router');
const bookingsRouter = require('./routers/bookings/bookings.router');

const app = express();

const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
    origin:function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error(`Not allowed by CORS ${origin}`));
        }
    },
    credentials:true //allow credientials  to store 
}));

app.use(express.json());
app.use(cookieParser());

app.use('/theater',theaterRouter);
app.use('/users',usersRouter);
app.use('/movies',moviesRouter);
app.use('/bookings',bookingsRouter);

module.exports = app;