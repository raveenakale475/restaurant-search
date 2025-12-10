const express = require('express');
const router = express.Router();
const dishController = require('./../controllers/dishController');

router.get('/dishes', dishController.searchDishesByName);

module.exports = router;