require('dotenv').config();
const asyncHandler = require('@joellesenne/express-async-handler');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const Email = require('../models/email');
const User = require('../models/user');
const TheaterCluster = require('../models/theater_cluster');
const Theater = require('../models/theater');
const Movie = require('../models/movie');
const ShowTime = require('../models/show_time');
const Booking = require('../models/booking');
const Ticket = require('../models/ticket');

router.get('/', function(req, res){    
    res.render('index', {title: 'Trang chủ' });
});


module.exports = router;
