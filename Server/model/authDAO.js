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
        let queryData = `INSERT INTO User (user_name, email, birth, address, phone) VALUES (?, ?, ?, ?, ?)`;
        db.query(queryData, [parameters.user_name, parameters.email, parameters.birth, parameters.address, parameters.phone], (err, db_data) => {
            if (err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

// const checkUserNum = (parameters) => {
//     return new Promise((resolve, reject) => {
//         let queryData = `SELECT user_num FROM user WHERE email =?`;
//         db.query(queryData, [parameters.email], (err, db_data) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(db_data);
//             }
//         })
//     })
// }

module.exports = {
    checkUserID,
    insertUser,
}