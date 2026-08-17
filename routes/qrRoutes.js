const express = require('express');
const router = express.Router();
const { generateQr, getHistory } = require('../controllers/qrController');

router.post('/generate', generateQr);
router.get('/history', getHistory);

module.exports = router;
