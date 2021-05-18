const asyncHandler = require('@joellesenne/express-async-handler');
const express = require('express');
const ensureLoggedIn = require('../middlewares/ensure_Logged_In');
const TheaterCluster = require('../models/theater_cluster');

const router = express.Router();

router.use(ensureLoggedIn);

module.exports = router;