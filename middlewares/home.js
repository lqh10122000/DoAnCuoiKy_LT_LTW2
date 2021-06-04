const asyncHandler = require("@joellesenne/express-async-handler");
const ShowTime = require("../models/show_time");
const Movie = require("../models/movie");
const TheaterCluster = require("../models/theater_cluster");
module.exports = asyncHandler(async function home(req, res, next) {
  res.locals.listMovie = null;
  res.locals.listTheaterCluster = null;
  const listMovie = await Movie.findAll();
  //   console.log("aaaaaaaaaaaaa + " + JSON.stringify(listMovie));
  const listTheaterCluster = await TheaterCluster.findAll();
  if (listMovie) {
    res.locals.listMovie = listMovie;
    res.locals.listTheaterCluster = listTheaterCluster;
    next();
  } else {
    next();
  }
});
