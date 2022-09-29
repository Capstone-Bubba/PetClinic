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
            user_name: req.body.name,
            address: req.body.address
        }
        console.log(parameters)
        const answer = await authDAO.insertUser(parameters);

        if(answer.affectedRows === 1) {
            res.send('1');
        } else {
            console.log('No AffectedRows');
        }
        
    } catch(err) {
        console.log(err);
    }
}

// Web Controller

const WebDetail = async (req, res) => {
    const parameters = {
        "email" : req.body.email,
        "password" : req.body.password
    }
    console.log(parameters);
    res.send('test');
}

module.exports = {
    sendResult,
    kakaoAppLogin,
    signUp,
    WebDetail
}