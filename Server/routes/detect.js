const express = require('express');
const router = express.Router();
const uploadPhoto = require('../middleware/multer');
const detectCtrl = require('../controller/detectCtrl');

router.post('/detecting', uploadPhoto.uploadPhoto.single('images'), detectCtrl.detection)

module.exports = router;