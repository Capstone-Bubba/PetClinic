const db = require('../config/dbConn');

const getNearHospital = (parameters) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT *,
        (6371*acos(cos(radians('${parameters.latitude}'))*cos(radians(latitude))*cos(radians(longitude)-radians('${parameters.longitude}'))+sin(radians('${parameters.latitude}'))*sin(radians(latitude)))) 
        AS distance 
        FROM hospital 
        HAVING distance < '${parameters.distance}'
        order by distance ASC;`, (err, db_data) => {
            if (err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const Create_Hospital = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `Insert INTO hospital SET ?`;
        db.query(queryData, parameters, (err, db_data) => {
            if(err){
                reject(err);
            } else{
                resolve(db_data);
            }
        })
    })
}

const Check_Hospital = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT EXISTS(SELECT h_num FROM hospital WHERE h_zipNo = ?) AS exist`;
        db.query(queryData, parameters, (err, db_data) => {
            if (err) {
                reject(err);
            } else {
                resolve(db_data);
            }
      })
    })
};

module.exports = {
    getNearHospital,
    Create_Hospital,
    Check_Hospital,
}