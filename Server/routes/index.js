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
  // 여기서도 로그인 정보가 있으면 바로 mypage로 넘어가게 하기
  res.render('auth/loginForm');
});

// 강제 URI 접속 막기
// router.get('/mypage', (req, res) => {
//   res.render('alert', { result : '잘못된 접근입니다.'});
// })

router.get('/mypage', (req, res) => {
  // 만약 로그인 정보가 없으면 res.render('alert')
  res.render('main/mypage');
})

router.post('/mypage', (req, res) => {
  console.log(req.body);
  res.render('main/mypage');
})

router.post('/test', (req, res) => {
  console.log(req.body);
  res.send('asdasd');
})

module.exports = router;
