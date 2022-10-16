const express = require('express');
const router = express.Router();
const passport = require('passport');
const authCtrl = require('../controller/authCtrl');
const uploadPhoto = require('../middleware/multer');

router.get('/kakao/callback', passport.authenticate('kakao'), authCtrl.sendResult);

router.post('/kakao/login', authCtrl.kakaoAppLogin);

router.post('/app/signup', authCtrl.signUp);

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup',  uploadPhoto.DocPhoto.single('avatar'), authCtrl.WebSignup);

router.get('/update', (req, res) => {
    res.render('auth/update');
});

router.get('/testing', (req, res) => {
    console.log('asd');
    res.send('asd');
})

router.get('/address/Popup', (req, res) => {
    res.render('auth/addressPopup');
});

router.post('/address/Popup', (req, res) => {
    res.locals = req.body;
    res.render('auth/addressPopup');
});

router.get('/hospital/Popup', authCtrl.search_hospital);

router.post('/hospital/Popup', authCtrl.getHospitalName);

router.get('/hospital', (req, res) => {
    // role 체크 이후 만약 관리자가 아니라면 권한 접근 오류 alert
    res.render('auth/hospitalForm');
})

router.post('/hospital', authCtrl.InsertHospital);

router.get('/logout', authCtrl.logout);

router.post('/get-user', authCtrl.getUserData)

module.exports = router;