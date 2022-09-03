const express = require('express');
const router = express.Router();
const uploadPhoto = require('../middleware/multer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index Page');
});

router.post('/test', (req, res) => {
  console.log(req.body);
  res.send('asdasd');
})

router.post('/testing', uploadPhoto.uploadPhoto.single('images'), (req, res) => {
  console.log(req.body);
  res.send('asd');
})

module.exports = router;
