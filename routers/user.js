const { promisify } = require('util');
const asyncHandler = require('@joellesenne/express-async-handler');
const express = require('express');
const ensureLoggedIn = require('../middlewares/ensure_Logged_In');
const multer  = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const rename = promisify(require('fs').rename);
const User = require('../models/user');

const router = express.Router();

router.use(ensureLoggedIn);

router.get('/profile', function (req, res) {
  res.locals.title = 'Thông tin cá nhân';
  res.render('user/profile');
});
router.post('/profile', upload.single('picture'), asyncHandler(async function (req, res) {
  const file = req.file;
  console.log(file);
  if (!file) {
    const error = new Error('Please choose files');
    error.httpStatusCode = 400;
    return next(error);
  }
  //await rename(file.path, `./public/pictures/${req.currentUser.id}.jpg`);
  const user = req.currentUser;
  user.picture = file.buffer;
  await user.save();
  res.redirect('/user/profile');
}));
router.get('/picture/:id', upload.single('picture'), asyncHandler(async function (req, res) {
  const user = await User.findById(req.params.id);
  if(!user || !user.picture){
    res.status(404).send('File not found');
  } else {
    res.header('Content-Type', 'image/jpeg').send(user.picture);
  }
}));
module.exports = router;
