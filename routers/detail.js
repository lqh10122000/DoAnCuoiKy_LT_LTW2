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
const { JSDOM } = jsdom;

function GetIdMovie() {
  console.log("Đã vô Get id : ");
}

router.get(
  "/",
  asyncHandler(async function (req, res) {
    res.locals.title = "Chi tiết phim";
    const IdMovie = req.query.id;

    const movie = await Movie.findById(IdMovie);
    const showTime = await ShowTime.findByMovieId(IdMovie);
    const idTheater = showTime[0].theaterId;
    const theaters = await Theater.findById(idTheater);

    console.log(" this is id show time :" + JSON.stringify(theaters));
    res.render("detail/movie", { movies: movie, showTimes: showTime });
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
