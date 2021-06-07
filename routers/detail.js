require("dotenv").config();
const asyncHandler = require("@joellesenne/express-async-handler");
const { body, validationResult } = require("express-validator");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const ShowTime = require("../models/show_time");
const Theater = require("../models/theater");
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
    const detailMovie = {
      id: movie.id,
      name: movie.name,
      picturePoster: movie.picturePoster,
      premiereDate: moment(movie.premiereDate).format("D MMM, YYYY"),
      time: movie.time,
    };
    const showTime = await ShowTime.findByMovieId(IdMovie);
    // const idTheater = showTime[0].theaterId;
    // const theaters = await Theater.findByMovieId(IdMovie);
    const HoursMinute = showTime.map((showTimeItem) => {
      return {
        minute: new Date(showTimeItem.start).getMinutes(),
        second: new Date(showTimeItem.start).getSeconds(),
        theaterId: showTimeItem.theaterId,
      };
    });

    console.log(" this is id show time :" + JSON.stringify(HoursMinute));
    res.render("detail/movie", { movies: detailMovie, showTimes: HoursMinute });
  })
);

router.post(
  "/movie",
  asyncHandler(async function (req, res) {
    res.locals.title = "Chi tiết phim";
    res.render("detail/movie");
  })
);

router.get("/theater", function (req, res) {
  res.locals.title = "Chi tiết rạp";
  res.render("detail/theater");
});

module.exports = router;
