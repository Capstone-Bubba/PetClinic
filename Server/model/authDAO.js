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
        let queryData = `INSERT INTO user (role, user_name, email, phone, address, password) VALUES (NULLIF(?,''), NULLIF(?,''), NULLIF(?,''), NULLIF(?,''), NULLIF(?,''), NULLIF(?,''))`;
        db.query(queryData, [parameters.role, parameters.user_name, parameters.email, parameters.phone, parameters.address, parameters.password], (err, db_data) => {
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
        let query = `SELECT EXISTS (SELECT * FROM user WHERE email = ?) AS isUser`;
        db.query(query, parameters.email, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const getAddr = (parameters) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT address FROM userInfo WHERE email = ?`
        db.query(query, parameters.email, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const getHospital = () => {
    return new Promise((resolve, reject) => {
        let query = `SELECT h_name FROM hospital`;
        db.query(query, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const searchHospital = (parameters) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT h_name FROM hospital WHERE h_name LIKE ?`;
        db.query(query, [parameters.word], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const checkPassword = (parameters) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT password FROM user where email=?`;
        db.query(query, [parameters.email], (err, db_data) => {
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
    checkUser,
    getAddr,
    getHospital,
    searchHospital,
    checkPassword,
}