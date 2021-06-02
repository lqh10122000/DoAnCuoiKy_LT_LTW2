const { promisify } = require('util');
const asyncHandler = require('@joellesenne/express-async-handler');
const express = require('express');
const ensureLoggedIn = require('../middlewares/ensure_Logged_In');
const multer  = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const rename = promisify(require('fs').rename);
const User = require('../models/user');
const Movie = require('../models/movie');

const router = express.Router();

router.get('/picturePoster/:id', upload.single('picturePoster'), asyncHandler(async function (req, res) {
  const movie = await Movie.findById(req.params.id);
  if(!movie || !movie.picturePoster){
    res.status(404).send('File not found');
  } else {
    res.header('Content-Type', 'image/jpeg').send(movie.picturePoster);
  }
}));
module.exports = router;
