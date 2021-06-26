require("dotenv").config();
const asyncHandler = require("@joellesenne/express-async-handler");
const { body, validationResult } = require("express-validator");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const express = require("express");
const moment = require("moment");
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

        // this is handle for theaterCluster

        const theaterCluster = await TheaterCluster.findAll();
        const showTime = await ShowTime.findIdByTheaterCluster(
          theaterCluster.map((item) => item.id.toString())
        );
        const booking = await Booking.findAll();
        
        const array1  = [] ;
        const arrayTheaterCluster  = [] ;

        for(let i = 0; i < showTime.length; i++)
        {
          let temp = 0;
          for(let j = 0; j < booking.length; j++)
          {
            if(showTime[i].id == booking[j].showTimeId)
            {
              temp += booking[j].totalMoney;
            }
          }
          array1.push( {showTime : showTime[i].id, 
            theaterClusterId: showTime[i].theaterClusterId , 
            totalMoney: temp});
        }

        for(let i = 0; i < theaterCluster.length; i++)
        {
          let temp = 0;
          for(let j = 0; j < array1.length; j++)
          {
            if(theaterCluster[i].id == array1[j].theaterClusterId)
            {
              temp += array1[j].totalMoney
            }
          }
          arrayTheaterCluster.push({theaterClusterId: theaterCluster[i].id,
            totalMoney: temp
          });
        }




        // this is hanle for movies that

        const arrayMovie = [];
        const arrayMovieFilter = [];
        const movie = await Movie.findAll();
        const showTimeMovie = await ShowTime.findIdByMovie(
          movie.map((item) => item.id.toString())
        );



        for(let i = 0; i < showTime.length; i++)
        {
          let temp = 0;
          for(let j = 0; j < booking.length; j++)
          {
            if(showTime[i].id == booking[j].showTimeId)
            {
              temp += booking[j].totalMoney;
            }
          }
          arrayMovie.push( {showTime : showTime[i].id, 
            movieId: showTime[i].movieId , 
            totalMoney: temp});
        }

        for(let i = 0; i < movie.length; i++)
        {
          let temp = 0;
          for(let j = 0; j < arrayMovie.length; j++)
          {
            if(movie[i].id == arrayMovie[j].movieId)
            {
              temp += arrayMovie[j].totalMoney
            }
          }
          arrayMovieFilter.push({movie: movie[i].id,
            totalMoney: temp
          });
        }

        res.render("admin/statistical", {theaterClusters: theaterCluster, 
          arrays: arrayTheaterCluster,
          movies: movie,
          arrayMovie: arrayMovieFilter
        });
    })

  );

  
router.post(
    "/",
    asyncHandler(async function (req, res) {
      const { timeStartTheater, timeEndTheater, timeStartMovie, timeEndMovie } = req.body;
      // req.currentUser.id = 1;
    //   const showTime = await ShowTime.findAll();

    if(timeStartTheater && timeEndTheater)
    {

      const theaterCluster = await TheaterCluster.findAll();
      const showTime = await ShowTime.findIdByTheaterCluster(
        theaterCluster.map((item) => item.id.toString())
      );
      const booking = await Booking.findAll();
      
      const array1  = [] ;
      const arrayTheaterCluster  = [] ;
  
      for(let i = 0; i < showTime.length; i++)
      {
        let temp = 0;


        for(let j = 0; j < booking.length; j++)
        {
          if(showTime[i].id == booking[j].showTimeId)
          {
            console.log("format yyy/mm/dd ", moment(booking[j].time).format("YYYY/MM/DD"));
            if(moment(moment(booking[j].time).format("YYYY/MM/DD")) > moment(timeStartTheater)&& moment(moment(booking[j].time).format("YYYY/MM/DD")) < moment(timeEndTheater))
            {
              console.log('đang vào trong !');

              temp += booking[j].totalMoney;
    
            }
          }
        }
        array1.push( {showTime : showTime[i].id, 
          theaterClusterId: showTime[i].theaterClusterId , 
          totalMoney: temp});

        
      }
  
      for(let i = 0; i < theaterCluster.length; i++)
      {
        let temp = 0;
        for(let j = 0; j < array1.length; j++)
        {
          if(theaterCluster[i].id == array1[j].theaterClusterId)
          {
            temp += array1[j].totalMoney
          }
        }
        arrayTheaterCluster.push({theaterClusterId: theaterCluster[i].id,
          totalMoney: temp
        });
      }

      res.render("admin/statistical", {theaterClusters: theaterCluster, 
        arrays: arrayTheaterCluster,
        movies: [],
        arrayMovie: [],
        title: 'Quản lí Phim'
      });



    }
    else
    {

      if(timeStartMovie && timeEndMovie)
      {



        const arrayMovie = [];
        const arrayMovieFilter = [];
        const movie = await Movie.findAll();
        const booking = await Booking.findAll();
        const showTimeMovie = await ShowTime.findIdByMovie(
          movie.map((item) => item.id.toString())
        );
    
    
        for(let i = 0; i < showTimeMovie.length; i++)
        {
          let temp = 0;
          for(let j = 0; j < booking.length; j++)
          {
            if(showTimeMovie[i].id == booking[j].showTimeId)
            {
              if(moment(moment(booking[j].time).format("YYYY/MM/DD")) > moment(timeStartMovie) && moment(moment(booking[j].time).format("YYYY/MM/DD")) < moment(timeEndMovie ))
              {

                temp += booking[j].totalMoney;
              }
            }
          }
          arrayMovie.push( {showTime : showTimeMovie[i].id, 
            movieId: showTimeMovie[i].movieId , 
            totalMoney: temp});
        }
    
        for(let i = 0; i < movie.length; i++)
        {
          let temp = 0;
          for(let j = 0; j < arrayMovie.length; j++)
          {
            if(movie[i].id == arrayMovie[j].movieId)
            {
              temp += arrayMovie[j].totalMoney
            }
          }
          arrayMovieFilter.push({movie: movie[i].id,
            totalMoney: temp
          });
        }


        res.render("admin/statistical", {theaterClusters: [], 
          arrays: [],
          movies: movie,
          arrayMovie: arrayMovieFilter,
          title: 'Quản lí Phim'
        });




      }



    }  



    // this is hanle for movies that

    



      
  
      
    })
  );

module.exports = router;