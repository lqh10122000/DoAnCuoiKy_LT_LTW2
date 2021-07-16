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

      const theaterCluster = await TheaterCluster.findAll();
      const theater = await Theater.findAll();
  
      res.render("admin/theatercluster", {
        theaters: theater,
        theaterClusters: theaterCluster,
      });
    })
  );

  
router.post(
    "/",
    asyncHandler(async function (req, res) {
      const { nameTheaterCluster, address, addressMap, nameTheater } = req.body;
      
  
      const now = Date.now();
      const idTheater = await Theater.findByName(nameTheater);
      const IDTheater = idTheater.id;

      console.log(
        "aaaaaaaaaaaaaaaaâ",
        nameTheaterCluster,
        address,
        addressMap,
        IDTheater
      );

      const newTheaterCluster = await TheaterCluster.create({
        name: nameTheaterCluster,
        address: address,
        theaterClusterId: Number(IDTheater),
        addressMaps : addressMap,
      });
      newTheaterCluster.save();
      res.redirect("/admin/theatercluster");
    })
);

router.get('/delete', asyncHandler(async function (req, res) { 
    const {id} = req.query;

    await TheaterCluster.destroy({
        where: {
          id,
        },
      });
    console.log('id of movie for delete ', id);
    res.redirect("/admin/theatercluster");
    })
);


router.post('/update', asyncHandler(async function (req, res) { 
  const {id} = req.query;
  const {nameTheaterCluster, TheaterClusterId, address} = req.body;

  await TheaterCluster.update(
    { name: nameTheaterCluster,
      theaterClusterId: Number(TheaterClusterId),
      address: address,   
    },
    { where: { id: id } }
  );
  console.log('id of movie for update ', nameTheaterCluster, TheaterClusterId, address);
  res.redirect("/admin/theatercluster");
  })
);


  

module.exports = router;