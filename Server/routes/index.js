const express = require('express');
const router = express.Router();
const hospitalDAO = require('../model/hospitalDAO');

const geo = require('node-geocoder');

const option = {
  provider: 'google',
  apiKey: 'AIzaSyA4gWVk1uzNyqDXbV2cPjmrLVq2oIeb_es'
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('index Page');
});

router.post('/test', (req, res) => {
  console.log(req.body);
  res.send('asdasd');
})

module.exports = router;
