require("dotenv").config();
const asyncHandler = require("@joellesenne/express-async-handler");
const { body, validationResult } = require("express-validator");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const ShowTime = require("../models/show_time");
const Theater = require("../models/theater");
const TheaterCluster = require("../models/theater_cluster");
const jsdom = require("jsdom");
const { time } = require("console");
const { JSDOM } = jsdom;
const moment = require("moment");

router.get(
  "/",
  asyncHandler(async function (req, res) {
    res.locals.title = "Chi tiết phim";
    const IdMovie = req.query.id;

    const movie = await Movie.findById(IdMovie);
    const Alltheater = await Theater.findAll();
    const AlltheaterCluster = await TheaterCluster.findAll();

    const detailMovie = {
      id: movie.id,
      name: movie.name,
      picturePoster: movie.picturePoster,
      premiereDate: moment(movie.premiereDate).format("D MMM, YYYY"),
      time: movie.time,
      trailer: movie.trailer,
      content: movie.content,
    };

    const theater = await Theater.findById();
    const showTime = await ShowTime.findByMovieId(IdMovie);

    const HoursMinute = showTime.map((showTimeItem) => {
      return {
        hour: new Date(showTimeItem.start).getHours(),
        minute: new Date(showTimeItem.start).getMinutes(),
        theaterId: showTimeItem.theaterId,
        showTimeId: showTimeItem.id,
        theaterClusterId: showTimeItem.theaterClusterId,
      };
    });

    res.render("detail/movie", { movies: detailMovie, showTimes: HoursMinute,
      theaters: Alltheater,
      theaterClusters: AlltheaterCluster });
  })
);

router.post(
  "/movie",
  asyncHandler(async function (req, res) {
    res.locals.title = "Chi tiết phim";
    res.render("detail/movie");
  })
);

router.get(
  "/theater",
  asyncHandler(async function (req, res) {
    const IdTheater = req.query.idT;
    const IdTheaterCluster = req.query.idTC;
    const showTime = await ShowTime.findTheaterClusterId(IdTheaterCluster);
    const theaterCluster = await TheaterCluster.findById(IdTheaterCluster);
    const movie = await Movie.findAll();

    const ShowTimeItems = showTime.map((showTimeItem) => {
      return {
        hour: new Date(showTimeItem.start).getHours(),
        minute: new Date(showTimeItem.start).getMinutes(),
        theaterId: showTimeItem.theaterId,
        showTimeId: showTimeItem.id,
        theaterClusterId: showTimeItem.theaterClusterId,
        movieId: showTimeItem.movieId,
      };
    });

    res.locals.title = "Chi tiết rạp";
    res.render("detail/theater", {
      TheaterClusters: theaterCluster,
      ShowTimes: ShowTimeItems,
      Movies: movie,
    });
  })
);

module.exports = router;
