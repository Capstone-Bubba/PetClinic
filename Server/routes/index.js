const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index Page');
});

router.post('/test', (req, res) => {
  console.log(req.body);
  res.send('asdasd');
})

// router.post('/testing', uploadPhoto.uploadPhoto.single('images'), (req, res) => {
//   effiNet.effiNet(path.join(path.join(__dirname + '/../' + req.file.path)));
// })

module.exports = router;
