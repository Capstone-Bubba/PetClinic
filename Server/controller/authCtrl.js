const authDAO = require('../model/authDAO');
const hospitalDAO = require('../model/hospitalDAO');

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

// Web Controller (Doctor)

const WebSignup = async (req, res) => {
    try{
        const parameters = {
            
        }
        res.send(req.body);
    } catch(err) {
        console.log(err);
    }
}

const InsertHospital = async (req, res) => {
    try {
        const parameters = {
            h_name : req.body.h_name,
            h_address : req.body.roadAddrPart1 + ' ' + req.body.addrDetail,
            h_phone : req.body.h_phone,
            h_book : 0,
            h_zipNo : req.body.zipNo
        }

        const data = await hospitalDAO.Check_Hospital(req.body.zipNo);
        if(data[0].exist != 1) {
            const answer = await hospitalDAO.Create_Hospital(parameters);

            if(answer.affectedRows === 1) {
                res.render('alert', { result : '성공적으로 등록'});
            } else {
                res.render('alert', { result : 'DB 등록 실패'});
                console.log('No AffectedRows');
            }
        }
        else {
            res.render('alert', { result : "이미 존재하는 병원입니다."});
        }
    }
    catch(err) {
        res.render('alert', {result : "sql Error"});
        console.log(err);
    }
}

module.exports = {
    sendResult,
    kakaoAppLogin,
    signUp,
    WebSignup,
    InsertHospital,
}