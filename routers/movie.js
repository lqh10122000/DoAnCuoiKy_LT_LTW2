const express = require("express");
// const Movies = require("../models/movie");
const asyncHandler = require("express-async-handler");
const Movie = require("../models/movie");
const Theater = require("../models/theater");
const TheaterCluster = require("../models/theater_cluster");
const moment = require("moment");
const router = express.Router();

const { promisify } = require("util");
// const asyncHandler = require('@joellesenne/express-async-handler');
const ensureLoggedIn = require("../middlewares/ensure_Logged_In");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const rename = promisify(require("fs").rename);

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
    res.render("index", 
    { title: "Trang chủ", 
      movies: movie, 
      days: Days, 
      });
  })
);

router.get(
  "/picturePoster/:id",
  upload.single("picturePoster"),
  asyncHandler(async function (req, res) {
    const movie = await Movie.findById(req.params.id);
    if (!movie || !movie.picturePoster) {
      res.status(404).send("File not found");
    } else {
      res.header("Content-Type", "image/jpeg").send(movie.picturePoster);
    }
  })
);

module.exports = router;
