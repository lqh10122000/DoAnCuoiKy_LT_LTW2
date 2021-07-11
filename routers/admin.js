require("dotenv").config();

const express = require("express");
const router = express.Router();

const movieAdmin = require("./movie.admin");
const theaterClusterAdmin = require("./theaterCluster.admin");
const theaterAdmin = require("./theater.admin");
const statisticalAdmin = require("./statistics.admin");
const showTimeAdmin = require('./showTime.admin');

const ensureLoggedIn = require("../middlewares/ensure_Logged_In");
const multer = require("multer");
const { promisify } = require("util");
const upload = multer({ storage: multer.memoryStorage() });

router.use('/movie', movieAdmin);
router.use('/theatercluster', theaterClusterAdmin);
router.use('/theater', theaterAdmin);
router.use('/statistical', statisticalAdmin);
router.use('/showtime', showTimeAdmin);

router.use(ensureLoggedIn);

router.use(function (req, res, next) {
  res.locals.title = "Quản lí";
  next();
});

router.get("/", function (req, res) {
  res.render("admin/home");
});






module.exports = router;
