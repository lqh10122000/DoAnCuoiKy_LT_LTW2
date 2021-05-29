require('dotenv').config();
const asyncHandler = require('@joellesenne/express-async-handler');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const express = require('express');
const router = express.Router();

router.get('/booking', function(req, res){     
    res.locals.title = 'Đặt vé'; 
    res.render('ticket/booking');
});

module.exports = router;