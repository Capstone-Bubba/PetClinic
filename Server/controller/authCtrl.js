const authDAO = require('../model/authDAO');

const sendResult = (req, res) => {
    console.log(req)
    res.send('ok');
}

const kakaoAppLogin = async (req, res) => {
    const parameters = {
        email: req.body.email
    }
    const data = await authDAO.checkUser(parameters);
    console.log(data);
    res.send({isUser: data[0].isUser})
}

const signUp = async (req, res) => {
    try {
        const parameters = {
            email: req.body.email,
            phone: req.body.phone,
            user_name: req.body.name
        }
        const answer = await authDAO.insertUser(parameters);
        res.send('1');
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    sendResult,
    kakaoAppLogin,
    signUp
}