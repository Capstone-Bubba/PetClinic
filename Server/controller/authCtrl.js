const authDAO = require('../model/authDAO');

const sendResult = (req, res) => {
    console.log(req)
    res.send('ok');
}

module.exports = {
    sendResult,
}