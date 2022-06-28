const express = require('express');
const router = express.Router();
const passport = require('passport');
const authCtrl = require('../controller/authCtrl');

router.get('/kakao/callback', passport.authenticate('kakao'), authCtrl.sendResult);

module.exports = router;