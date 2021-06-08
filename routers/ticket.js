require("dotenv").config();
const asyncHandler = require("@joellesenne/express-async-handler");
const { body, validationResult } = require("express-validator");
const crypto = require("crypto");
const express = require("express");
const Theater = require("../models/theater");
const ShowTime = require("../models/show_time");
const Movie = require("../models/movie");
const TheaterCluster = require("../models/theater_cluster");
const User = require("../models/user");
const router = express.Router();

router.get(
  "/",
  asyncHandler(async function (req, res) {
    res.locals.title = "Đặt vé";
    const IdMovie = req.query.idM;
    const IdTheater = req.query.idT;
    const IdTheaterCluster = req.query.idTC;
    const IdTime = req.query.idTime;

    const theater = await Theater.findTheaterCluster(
      IdTheater,
      IdTheaterCluster
    );
    const showtime = await ShowTime.findById(IdTime);
    const movie = await Movie.findById(IdMovie);
    const theaterCluster = await TheaterCluster.findById(IdTheaterCluster);
    const user = await User.findById(1);

    // if (!req.session.userId) {
    //   res.redirect("/");
    // } else {
    // const user = await User.findById(req.session.userId);

    // }
    // const IdUser = req.session.userId;
    // console.log("aaaaaaaaaaaaa : " + IdUser);

    res.render("ticket/booking", {
      Theaters: theater,
      ShowTimes: showtime,
      Movies: movie,
      TheaterClusters: theaterCluster,
      Users: user,
    });
  })
);

router.get("/booking", function (req, res) {
  const DSGH = req.body.danhSachGhe;
  console.log("aaaaaaaaaaaaaaaaaaaaaa : " + DSGH);
});

module.exports = router;
