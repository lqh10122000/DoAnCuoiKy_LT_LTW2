require("dotenv").config();
const JSAlert = require("js-alert");
const asyncHandler = require("@joellesenne/express-async-handler");
const Email = require("../models/email");
const { body, validationResult } = require("express-validator");
const crypto = require("crypto");
const express = require("express");
const document = require("min-document");
const Theater = require("../models/theater");
const ShowTime = require("../models/show_time");
const Movie = require("../models/movie");
const TheaterCluster = require("../models/theater_cluster");
const User = require("../models/user");
const Booking = require("../models/booking");
const Ticket = require("../models/ticket");
const router = express.Router();
const moment = require("moment");

router.get(
  "/",
  asyncHandler(async function (req, res) {

    res.locals.title = "Đặt vé";

    const currentUser = req.currentUser;
    let user;


    if(currentUser)
    {
      user = await User.findById(currentUser.id);

    }
    else  
    {
      user = [{displayName: "", email: "", phone: "",}];
      
    }

    // get infor prom query
    const IdMovie = req.query.idM;
    const IdTheater = req.query.idT;
    const IdTheaterCluster = req.query.idTC;
    const IdTime = req.query.idTime;

    console.log('this is all id ', IdMovie, IdTheater, IdTheaterCluster, IdTime);

    // get data from database loading for infor movie and showtime

    const theater = await Theater.findTheaterCluster(
      IdTheater,
      IdTheaterCluster
    );
    const showtime = await ShowTime.findById(IdTime);
    const movie = await Movie.findById(IdMovie);
    const theaterCluster = await TheaterCluster.findById(IdTheaterCluster);

    // get showtimeId from booking
    const bookingId = await Booking.findBookingId(showtime.id);
    let allSeat = [];

    for (let i = 0; i < bookingId.length; i++) {
      const allSeatCode = await Ticket.findBookingId(String(bookingId[i].id));
      for (let j = 0; j < allSeatCode.length; j++) {
        allSeat.push(allSeatCode[j].seatCode);
      }
    }

    res.render("ticket/booking", {
      Theaters: theater,
      ShowTimes: showtime,
      Movies: movie,
      TheaterClusters: theaterCluster,
      Users: user,
      AllSeat: allSeat,
    });
  })
);

async function SendEmail(dataSendEmail) {
  await Email.send(
    dataSendEmail.email,
    `Đặt Vé Xem Phim ${dataSendEmail.movie}`,
    `Mã vé của bạn là ${dataSendEmail.bookingId} thời gian ${dataSendEmail.time} ghế ${dataSendEmail.seatCode} tại ${dataSendEmail.theaterCluster}`
  );
}

router.post(
  "/booking",
  asyncHandler(async function (req, res) {

    if(!req.currentUser)
    {
      res.redirect('/auth/login');
    }
    const { idT, idUser } = req.query;
    var ghe = req.body.danhSachGhe;
    const allSeatCode = ghe;
    const totalMoney = req.body.gia;

    var nowDate = moment().format();

    Booking.createBooking(idUser, idT, nowDate, totalMoney);
    const findUser = await User.findById(idUser);
    const findShowTime = await ShowTime.findById(idT);
    const findMovie = await Movie.findById(findShowTime.movieId);
    const findTheaterCluster = await TheaterCluster.findById(
      findShowTime.theaterClusterId
    );
    const userBooking = await Booking.findUserBooking(idUser);

    const bookingId = userBooking[userBooking.length - 1].id;
    const price = totalMoney / ghe.length;
    const tempSeatCode = ghe;

    while (ghe.length > 0) {
      var splitted = ghe.split(",", 1);

      if (ghe.length > 3) {
        const bookingSeccess = await Ticket.createTicket(
          bookingId,
          splitted,
          price
        );
      }

      splitted = splitted + ",";

      ghe = ghe.replace(splitted, "");

      if (ghe.length <= 3) {
        var lastSeatCode = ghe.split(",", 1);

        const bookingSeccess = await Ticket.createTicket(bookingId, lastSeatCode, price);

        ghe = "";
      }
    }


    const dataSendEmail = {
      email: findUser.email,
      bookingId: bookingId,
      time: findShowTime.start,
      movie: findMovie.name,
      theaterCluster: findTheaterCluster.name,
      seatCode: allSeatCode
    };


    SendEmail(dataSendEmail);

    res.redirect("/");
  })
);

module.exports = router;
