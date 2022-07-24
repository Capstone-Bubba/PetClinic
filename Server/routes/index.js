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

module.exports = router;
