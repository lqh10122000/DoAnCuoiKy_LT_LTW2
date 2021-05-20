require('dotenv').config();
const asyncHandler = require('@joellesenne/express-async-handler');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const express = require('express');
const router = express.Router();

router.get('/movie', function(req, res){     
    res.locals.title = 'Chi tiết phim'; 
    res.render('detail/movie');
});

router.get('/theater', function(req, res){   
    res.locals.title = 'Chi tiết rạp';  
    res.render('detail/theater');
});

module.exports = router;