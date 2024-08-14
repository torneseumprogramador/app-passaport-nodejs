const express = require('express');
const router = express.Router();
const toyController = require('../controllers/toyController');

router.get('/', toyController.getToys);
router.post('/', toyController.createToy);

module.exports = router;
