const asyncHandler = require("@joellesenne/express-async-handler");
const ShowTime = require("../models/show_time");
const Movie = require("../models/movie");
const TheaterCluster = require("../models/theater_cluster");
module.exports = asyncHandler(async function home(req, res, next) {
  res.locals.listMovie = null;
  res.locals.listTheaterCluster = null;
  res.locals.listMovieLove = null;
  res.locals.datenow = Date.now();
  const listMovie = await Movie.findAll();
  const listTheaterCluster = await TheaterCluster.findAll();
  //const listMovieLike = await Movie.getAllListMovieLike();
  const listMostWatchedMovies = await ShowTime.getMostWatchedMovies();
  const MostWatchedMovies = await Movie.findById(listMostWatchedMovies[0][0].movieId);
  if (listMovie) {
    res.locals.listMovie = listMovie;
    res.locals.listTheaterCluster = listTheaterCluster;
    //res.locals.listMovieLike = listMovieLike;
    res.locals.MostWatchedMovies= MostWatchedMovies;
    next();
  } else {
    next();
  }
});

