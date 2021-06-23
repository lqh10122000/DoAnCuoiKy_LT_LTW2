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





router.get(
    "/",
    asyncHandler(async function (req, res) {
        res.locals.title = "Quản lí Phim";
      const theater = await Theater.findAll();
      res.render("admin/theater", { theaters: theater });
    })
  );


  

router.post(
    "/",
    asyncHandler(async function (req, res) {
      const { nameTheater, species, horizontalSize, wideSide } =
        req.body;
  
      console.log(
        "add theater",
        nameTheater,
        species,
        horizontalSize,
        wideSide
      );
  
      const allTheater = await Theater.findAll();
      const theaterClusterId = allTheater.length + 1;
  
      console.log(theaterClusterId);
  
      const newTheater = await Theater.create({
        name: nameTheater,
        species: species,
        'horizontalSize': horizontalSize,
        'wideSize': wideSide,
        'theaterClusterId': theaterClusterId,
      });
  
      res.redirect("/admin/theater");
    })
  );


  
router.get('/delete', asyncHandler(async function (req, res) { 
    const {id} = req.query;

    await Theater.destroy({
        where: {
          id,
        },
      });
    console.log('id of movie for delete ', id);
    res.redirect("/admin/theater");
    })
);

router.post('/update', asyncHandler(async function (req, res) {
  const {id} = req.query;
  const {nameTheater, species, horizontalSize, wideSize} = req.body;

  await Theater.update(
    { name: nameTheater,
      species: species,
      'horizontalSize': horizontalSize,
      'wideSize': wideSize
    },
    { where: { id: id } }
  );
   

  console.log('id of theater ', nameTheater, species, horizontalSize, wideSize);
  res.redirect("/admin/theater");
}))


module.exports = router;