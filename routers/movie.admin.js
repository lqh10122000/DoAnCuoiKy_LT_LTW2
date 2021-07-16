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
      const movie = await Movie.findAll();
      res.render("admin/movie", { movies: movie });
    })
  );


  
router.post(
    "/",
    upload.single("picture"),
    asyncHandler(async function (req, res) {
      const { nameMovie, timeMovie, trailerMovie, dateMovie, content } = req.body;
      // req.currentUser.id = 1;
  
      const file = req.file;
      
      console.log(file);
      if (!file) {
        const error = new Error("Please choose files");
        error.httpStatusCode = 400;
        return next(error);
      } else {
        const newMovie = await Movie.create({
          name: nameMovie,
          premiereDate: dateMovie,
          picturePoster: file.buffer ,
          time: Number(timeMovie),
          trailer: trailerMovie,
          content: content,
        });
        await newMovie.save();
      }
      res.redirect("/admin/movie");
    })
  );

router.get('/delete', asyncHandler(async function (req, res) { 
    const {id} = req.query;

    await Movie.destroy({
        where: {
          id,
        },
      });
    console.log('id of movie for delete ', id);
    res.redirect("/admin/movie");
    })
);


router.post('/update', 
upload.single("picture"),
asyncHandler(async function (req, res) {
  const {id} = req.query;
  const {nameMovie, timeMovie, trailerMovie, content, premiereDate } = req.body;
  const file = req.file;

  console.log('aaaaaaaaaa', id, nameMovie, timeMovie, trailerMovie, content, premiereDate );

  await Movie.update(
    { 
      name: nameMovie,
      time: Number(timeMovie),
      trailer: trailerMovie,   
      content: content,
      premiereDate: premiereDate,
      picturePoster: file.buffer
    },
    { where: { id: id } }
  );
  res.redirect("/admin/movie");
}))
  

module.exports = router;