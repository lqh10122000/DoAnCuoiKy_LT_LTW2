const express = require("express");
const Movies = require("../models/movie");
const asyncHandler = require("express-async-handler");
const Movie = require("../models/movie");
const moment = require("moment");
const router = express.Router();

function today() {
  var today = new Date();
  var day = Number(String(today.getDate()).padStart(2, "0"));
  var month = Number(String(today.getMonth() + 1).padStart(2, "0")); //January is 0!
  var year = today.getFullYear();

  today = { day, month, year };
  return today;
}

function getDaysInMonth() {
  var days = [];

  for (let i = 1; i <= 10; i++) {
    days.push(moment().add(i, "days").calendar());
  }

  return days;
}

router.post(
  "/detail",
  asyncHandler(async function (req, res, text) {})
);

router.get(
  "/",
  asyncHandler(async function (req, res, next) {
    const movie = await Movie.getAllMovies();
    const showDate = new Date();
    const Days = getDaysInMonth();
    res.render("index", { title: "Trang chủ", movies: movie, days: Days });
  })
);

module.exports = router;
