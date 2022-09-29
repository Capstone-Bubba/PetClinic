const express = require('express');
const router = express.Router();
const passport = require('passport');
const authCtrl = require('../controller/authCtrl');

router.get('/kakao/callback', passport.authenticate('kakao'), authCtrl.sendResult);

router.post('/kakao/login', authCtrl.kakaoAppLogin);

router.post('/signup', authCtrl.signUp);

// Web Router

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/detail', authCtrl.WebDetail);

router.get('/address/Popup', (req, res) => {
    res.render('auth/addressPopup');
});

router.post('/address/Popup', (req, res) => {
    res.locals = req.body;
    res.render('auth/addressPopup');
});

module.exports = router;