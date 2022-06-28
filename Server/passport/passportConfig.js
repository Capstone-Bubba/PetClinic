const passport = require('passport');
// const NaverLogin = require('./naverStrategy');
// const GoogleLogin = require('./googleStrategy');
const KakaoLogin = require('./kakaoStrategy');

module.exports = () => {
    //serialization : 객체를 직렬화 하여 전송가능한 형태로 변형
    //req.login(user, ~)가 실행되면, serializeUser 실행
    passport.serializeUser((user,done) => {
        // 어떤 데이터를 저장할지 지정, 아래의 경우 user의 모든 데이터 저장
        // 데이터를 deserializeUser에 전송(user의 모든 데이터를 저장하기 때문에 서버 자원낭비가 있으므로 차후 수정)
        done(null, user);
    })

    //deserialization : 직렬화된 데이터를 역직렬화 하여 객체의 형태로 변형
    //serializeUser에서 done 하면 실행
    passport.deserializeUser((id, done) => {
        //done이 되면 req.login(user, ~) 쪽으로 돌아가 다음 미들웨어 실행
        done(null, id);
    })

    // NaverLogin();
    // GoogleLogin();
    KakaoLogin();
}