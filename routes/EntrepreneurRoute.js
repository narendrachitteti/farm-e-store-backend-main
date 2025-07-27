const express = require('express');
const router = express.Router();
const entrepreneurController = require('../controllers/EntrepreneurController');

router.post('/add-entrepreneur', entrepreneurController.createEntrepreneur);
router.get('/get-entrepreneurs', entrepreneurController.getEntrepreneurs);

module.exports = router;
