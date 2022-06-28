const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;
const authDAO = require('../model/authDAO');
require('dotenv').config({ path: ".env "});

module.exports = () => {
    passport.use(new kakaoStrategy({
        clientID: process.env.KAKAO_CLIENT_ID,
        clientSecret : process.env.KAKAO_SECRET,
        callbackURL: process.env.KAKAO_CALLBACK_URL,
    }, async (req, accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
            const parameters = {
                email: profile._json.kakao_account.email,
                user_name : profile.username,
                birth : profile._json.kakao_account.birthday
            }
            console.log("parameters" , parameters);

            const isUser = await authDAO.checkUserID(parameters);
            
            if(isUser[0].exist == 0) {
                await authDAO.insertUser(parameters);
            }
            
            // const isUserNum = await authDAO.checkUserNum(parameters);
            return done(null, {"email": profile._json.kakao_account.email, "user_name": profile.username, "birth" : profile._json.kakao_account.birthday});
        } catch (err) {
            console.log(err);
            return done(null, false, { message: err });
        }
    }))
}