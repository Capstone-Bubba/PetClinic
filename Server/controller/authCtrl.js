const authDAO = require('../model/authDAO');
const day = require('dayjs');
const hospitalDAO = require('../model/hospitalDAO');
const doctorDAO = require('../model/doctorDAO');

const sendResult = (req, res) => {
    console.log(req)
    res.send('ok');
}

const kakaoAppLogin = async (req, res) => {
    const parameters = {
        email: req.body.email
    }

    const data = await authDAO.checkUser(parameters);
    console.log(data[0].isUser);
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
        console.log(parameters);
        
        const user_data = await authDAO.getUserData(parameters);
        let date = day(user_data[0].createAt);
        user_data[0].createAt = date.format('YYYY-MM-DD')
        console.log(user_data);
        res.send(user_data[0]);
    } catch(err) {
        console.log(err);
    }
}
// Web Controller (Doctor)

const WebSignup = async (req, res) => {
    try{
        const parameters = {
            user_name : req.body.nickname,
            role : req.body.role,
            email : req.body.email,
            phone : req.body.telephone,
            birth : req.body.birth,
            address : null,
            password : req.body.password,
            h_name : req.body.hospital,
            doctor_major : req.body.major,
            rank : req.body.rank,
            career : req.body.career
        };
        console.log(parameters);
        const data = await authDAO.checkUser(parameters);
        const hospital = await hospitalDAO.Check_Hospital_Web(parameters);
        const h_num = hospital[0].h_num;
        if(data[0].isUser == 1){
            res.render('alert', {result : '이미 존재하는 아이디입니다.'});
        }
        else if(h_num == undefined) {
            res.render('alert', {result : "존재하지 않는 병원입니다."});
        }
        else {
            parameters['h_num'] = h_num;
            const answer = await authDAO.insertUser(parameters);
            await doctorDAO.insertDoctor(parameters);
            console.log('affected' , answer.affectedRows);
            if(answer.affectedRows === 1) {
                res.render('alert', {result : '회원가입 완료'});
            } else {
                res.render('alert', {result : '입력값이 잘못되었습니다.'});
                console.log('No AffectedRows');
            }
        }
    } catch(err) {
        res.render('alert', {result : '필수 항목을 입력해주세요'})
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

const search_hospital = (req, res) => {
    // try{
    //     const result = await authDAO.getHospital();
    //     console.log(result);
    //     console.log(result[0].h_name);
    res.render('auth/searchHospital', {judgement : 0});
    // }
    // catch(err){
    //     console.log(err);
    // }
}

const getHospitalName = async (req, res) => {
    try {
        const parameters = {
            word : '%' + req.body.hospital + '%'
        }
        console.log(parameters);
        const result = await authDAO.searchHospital(parameters);
        console.log(result);
        res.render('auth/searchHospital', {judgement : 1, result : result});
    } catch (err) { 
        console.log(err);
    }
        
}

const logout = (req, res)  => {
    req.logout();
    req.session.destroy((err) => {
        if(err) {
            console.log(err);
            res.render('alert', {result : "로그인 실패"});
        }
        console.log(req.isAuthenticated());
        res.render('/');
    })
}

const WebLogin = async (req, res) => {
    const parameters = {
        email : req.body.email,
        passwd : req.body.password
    };
    console.log(parameters);
    const result = await authDAO.checkUser(parameters);
    console.log(result);
    if(result[0].isUser == undefined){
        res.render('alert', {result : '없는 아이디 입니다.'});
    } else {
        const pwd = await authDAO.checkPassword(parameters);
        // if(pwd != parameters.passwd){
        //     res.render('alert', {result : '비밀번호 오류'});
        // } else {
            res.render('/main/mypage');
        // }
    }
}

module.exports = {
    sendResult,
    kakaoAppLogin,
    signUp,
    getUserData,
    WebSignup,
    InsertHospital,
    getHospitalName,
    search_hospital,
    logout,
    WebLogin,
}