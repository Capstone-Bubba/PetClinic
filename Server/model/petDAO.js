const db = require('../config/dbConn');

const getPet = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT * FROM petInfo WHERE user_num = ?`;
        db.query(queryData, parameters.user_num, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const updatePet = (parameters, user_num) => {
    return new Promise((resolve, reject) => {
        let queryData = `UPDATE petInfo SET ? WHERE user_num = ?`
        db.query(queryData, [parameters, user_num.user_num], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

module.exports = {
    getPet,
    updatePet
}