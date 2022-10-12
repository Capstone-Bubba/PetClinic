const express = require('express');
const router = express.Router();
const passport = require('passport');
const authCtrl = require('../controller/authCtrl');
const uploadPhoto = require('../middleware/multer');

router.get('/kakao/callback', passport.authenticate('kakao'), authCtrl.sendResult);

router.post('/kakao/login', authCtrl.kakaoAppLogin);

router.post('/app/signup', authCtrl.signUp);

// Web Router

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup',  uploadPhoto.DocPhoto.single('avatar'), authCtrl.WebSignup);

router.get('/update', (req, res) => {
    // 현재 접속해 있는 유저아이디 값을 이용하여 DB 전체 값을 가져와서 value값에 추가.
    res.render('auth/update');
});

// router.post('/update', (req, res) => {
//     // signup과 같은 행동 이지만 sql문은 update 문으로 변경
//     res.render('main/mypage');
// });

// router.post('/detail', authCtrl.WebDetail);

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