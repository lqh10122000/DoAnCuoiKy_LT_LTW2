require("dotenv").config();
const asyncHandler = require("@joellesenne/express-async-handler");
const { body, validationResult } = require("express-validator");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const movieAdmin = require("./movie.admin");
const theaterClusterAdmin = require("./theaterCluster.admin");
const theaterAdmin = require("./theater.admin");

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




router.use('/movie', movieAdmin);
router.use('/theatercluster', theaterClusterAdmin);
router.use('/theater', theaterAdmin);




router.use(ensureLoggedIn);





router.use(function (req, res, next) {
  res.locals.title = "Quản lí";
  next();
});

router.get("/", function (req, res) {
  res.render("admin/home");
});



router.get("/showtime", function (req, res) {
  res.render("admin/showtime");
});

router.get(
  "/statistical",
  asyncHandler(async function (req, res) {
    res.render("admin/statistical");
  })
);


module.exports = router;
