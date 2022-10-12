const db = require('../config/dbConn');

const checkDoctorID = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT EXISTS(SELECT doctor_num FROM doctor WHERE email = ?) AS exist`;
        db.query(queryData, [parameters.email], (err, db_data) => {
            if (err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const insertDoctor = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `INSERT INTO doctor (h_num, doctor_name, doctor_phone, doctor_major, doctor_education, doctor_career) VALUES (NULLIF(?,''), NULLIF(?,''), NULLIF(?,''), NULLIF(?,''), NULLIF(?,''), NULLIF(?,''))`;
        db.query(queryData, [parameters.h_num, parameters.user_name, parameters.phone, parameters.doctor_major, parameters.rank, parameters.career], (err, db_data) => {
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
module.exports = {
    insertDoctor,
    checkDoctorID
}