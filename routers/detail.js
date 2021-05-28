require("dotenv").config();
const asyncHandler = require("@joellesenne/express-async-handler");
const { body, validationResult } = require("express-validator");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function GetIdMovie() {
  console.log("Đã vô Get id : ");
}

router.get(
  "/movie",
  asyncHandler(async function (req, res) {
    res.locals.title = "Chi tiết phim";
    const movie = await Movie.getAllMovies();

    // var a = JSDOM.getElementsByTagName("a");

    // JSDOM.getElementById("demo").innerHTML = a[0].getAttribute("value");

    // console.log("aaaaaaa: " + a[0].getAttribute("value"));

    res.render("detail/movie", { movies: movie });
  })
);

router.post(
  "/movie",
  asyncHandler(async function (req, res) {
    res.locals.title = "Chi tiết phim";
    const movie = await Movie.getAllMovies();

    // var a = JSDOM.getElementsByTagName("a");

    // JSDOM.getElementById("demo").innerHTML = a[0].getAttribute("value");

    console.log("aaaaaaa: ");

    res.render("detail/movie", { movies: movie });
  })
);

router.get("/theater", function (req, res) {
  res.locals.title = "Chi tiết rạp";
  res.render("detail/theater");
});

module.exports = router;
