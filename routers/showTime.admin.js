require("dotenv").config();
const asyncHandler = require("@joellesenne/express-async-handler");
const { body, validationResult } = require("express-validator");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const movieAdmin = require("./movie.admin");

const Email = require("../models/email");   
const User = require("../models/user");
const TheaterCluster = require("../models/theater_cluster");
const Theater = require("../models/theater");
const Movie = require("../models/movie");
const ShowTime = require("../models/show_time");
const Booking = require("../models/booking");
const Ticket = require("../models/ticket");

const ensureLoggedIn = require("../middlewares/ensure_Logged_In");
const multer = require("multer");
const { promisify } = require("util");
const upload = multer({ storage: multer.memoryStorage() });
const rename = promisify(require("fs").rename);



router.get("/", asyncHandler(async function (req, res) {
    res.locals.title = "Quản lí Phim";

    const showTime = await ShowTime.findAll();
    const movie = await Movie.findAll();
    const theater = await Theater.findAll();
    const theaterCluster = await TheaterCluster.findAll();

    res.render("admin/showtime", {showTimes: showTime,
        movies: movie, 
        theaters: theater, 
        theaterClusters: theaterCluster});
  }));

  
router.post(
    "/",
    asyncHandler(async function (req, res) {

    const {movie, theaterCluster, time, hourStart, minuteStart, start, price} = req.body;

    let startDate, endDate;

    if(time == "AM")
    { 
        let hour, endHour;
        if(hourStart < 10)
        {
            hour = '0' + hourStart.toString();
        }
        endHour = Number(hourStart) + 1;
        if(endHour < 10)
        {
            endHour = '0' + endHour.toString();

        }
        startDate = start.toString() + ' ' + hour + ':' + minuteStart.toString()  + ':' + '00';
        endDate = start.toString() + ' ' + endHour + ':' + minuteStart.toString()  + ':' + '00';
        
        console.log('this is start ', endDate);
    }
    else
    {
        const hour = Number(hourStart) + 12;
        startDate = start.toString() + ' ' + hour.toString() + ':' + minuteStart.toString()  + ':' + '00';
        endDate = start.toString() + ' ' + (hour + 1).toString() + ':' + minuteStart.toString()  + ':' + '00';
        
        console.log('this is start ', endDate);
    }

    const theater = await  TheaterCluster.findTheaterByTheaterCluster(theaterCluster);

    console.log('this is start ', endDate);

    const date = new Date(startDate);
    const end = new Date(endDate);

    console.log('this is date ', end);
    

    const newShowtime = await ShowTime.create({
        'movieId' : movie,
        'theaterId' : theater.theaterClusterId,
        'theaterClusterId' : theaterCluster,
        start : date,
        end : end,
        price: price
    });

    newShowtime.save();

    res.redirect("/admin/showtime");

    }

));


router.get('/delete', async function (req, res) {

    const {id} = req.query;

    await ShowTime.destroy({
        where: {
            id,
          },
    })

    res.redirect("/admin/showtime");

});


router.post('/update', async function (req, res) {
    const {id} = req.query;



    const {movie, theaterCluster, time, hourStart, minuteStart, start, price} = req.body;

    let startDate, endDate;

    if(time == "AM")
    { 
        let hour, endHour;
        if(hourStart < 10)
        {
            hour = '0' + hourStart.toString();
        }
        endHour = Number(hourStart) + 1;
        if(endHour < 10)
        {
            endHour = '0' + endHour.toString();

        }
        startDate = start.toString() + ' ' + hour + ':' + minuteStart.toString()  + ':' + '00';
        endDate = start.toString() + ' ' + endHour + ':' + minuteStart.toString()  + ':' + '00';
        
        console.log('this is start ', endDate);
    }
    else
    {
        const hour = Number(hourStart) + 12;
        startDate = start.toString() + ' ' + hour.toString() + ':' + minuteStart.toString()  + ':' + '00';
        endDate = start.toString() + ' ' + (hour + 1).toString() + ':' + minuteStart.toString()  + ':' + '00';
        
        console.log('this is start ', endDate);
    }

    const theater = await  TheaterCluster.findTheaterByTheaterCluster(theaterCluster);

    console.log('this is start ', endDate);

    const date = new Date(startDate);
    const endStart = new Date(endDate);


    console.log('this is update in showtime', start);


    await ShowTime.update(
        { 'movieId': movie.toString(),
          'theaterId': theater.id.toString(),
          'theaterClusterId': theaterCluster.toString(),   
          start: date,
          end: endStart,
          price: price
        },
        { where: { id: id } }
      );



    res.redirect("/admin/showtime");

})





module.exports = router;