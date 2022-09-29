const express = require('express');
const router = express.Router();
const hospitalDAO = require('../model/hospitalDAO');

const geo = require('node-geocoder');

const option = {
  provider: 'google',
  apiKey: 'AIzaSyA4gWVk1uzNyqDXbV2cPjmrLVq2oIeb_es'
}

/* GET home page. */
router.get('/', (req, res) => {
  res.render('auth/loginForm');
});

router.get('/main', function (req, res, next) {
  res.render('main');
})

router.post('/test', (req, res) => {
  console.log(req.body);
  res.send('asdasd');
})

module.exports = router;
