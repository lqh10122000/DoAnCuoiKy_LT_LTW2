require('dotenv').config();
const asyncHandler = require('@joellesenne/express-async-handler');
const express = require('express');
const router = express.Router();
const TheaterCluster = require('../models/theater_cluster');
const Theater = require('../models/theater');

router.get('/', asyncHandler(async function(req, res){    
    const theater = await Theater.findAll();
    const theaterCluster = await TheaterCluster.findAll();
    res.render('index', {title: 'Trang chủ', theaters: theater, theaterClusters: theaterCluster });
}));

module.exports = router;
