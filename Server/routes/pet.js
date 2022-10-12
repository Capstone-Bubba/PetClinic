const express = require('express');
const router = express.Router();
const petCtrl = require('../controller/petCtrl');
const uploadPhoto = require('../middleware/multer');

router.post('/', petCtrl.getPetData)

router.post('/update', uploadPhoto.uploadProfilePhoto.single('images'), petCtrl.updatePetData);

module.exports = router