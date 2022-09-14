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

module.exports = {
    getNearHospital
}