const db = require('../config/dbConn');

const checkUserID = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT EXISTS(SELECT user_num FROM user WHERE email = ?) AS exist`;
        db.query(queryData, [parameters.email, parameters.platform], (err, db_data) => {
            if (err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const insertUser = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `INSERT INTO userInfo (user_name, email, phone, address) VALUES (?, ?, ?, ?)`;
        db.query(queryData, [parameters.user_name, parameters.email, parameters.phone, parameters.address], (err, db_data) => {
            if (err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const checkUser = (parameters) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT EXISTS (SELECT * FROM userInfo WHERE email = ?) AS isUser`;
        db.query(query, parameters.email, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

module.exports = {
    checkUserID,
    insertUser,
    checkUser
}