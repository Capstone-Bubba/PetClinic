const authDAO = require('../model/authDAO');
const day = require('dayjs');

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
            user_name: req.body.name,
            address: req.body.address
        }
        
        const answer = await authDAO.insertUser(parameters);
        const user_data = await authDAO.getUserData(parameters);

        if(answer.affectedRows === 1) {
            res.send({success: '1', user_data});
        } else {
            console.log('No AffectedRows');
        }
        
    } catch(err) {
        console.log(err);
    }
}

const getUserData = async (req, res) => {
    try {
        const parameters = {
            email: req.body.email
        }
        
        const user_data = await authDAO.getUserData(parameters);
        let date = day(user_data[0].createAt);
        user_data[0].createAt = date.format('YYYY-MM-DD')
        console.log(user_data);
        res.send(user_data);
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    sendResult,
    kakaoAppLogin,
    signUp,
    getUserData
}