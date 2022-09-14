const spawn = require('child_process').spawn;
const path = require('path');
const authDAO = require('../model/authDAO');
const hospitalDAO = require('../model/hospitalDAO');
const geo = require('node-geocoder');

const option = {
    provider: 'google',
    apiKey: 'AIzaSyA4gWVk1uzNyqDXbV2cPjmrLVq2oIeb_es'
}

const detection = (req, res) => {
    const part = req.body.part
    let modelPath;
    file = path.join(__dirname + '/../' + req.file.path);
    switch (part) {
        case 'head':
            modelPath = path.join(__dirname + '/../public/model/petclinc_model_b0.pt');
            console.log('head');
            break;
        case 'abdomen':
            modelPath = path.join(__dirname + '/../public/model/petclinc_model_b0.pt');
            console.log('abdomen');
            break;
        case 'foot':
            modelPath = path.join(__dirname + '/../public/model/petclinc_model_b0.pt');
            console.log('foot');
            break;
        case 'crotch':
            modelPath = path.join(__dirname + '/../public/model/petclinc_model_b0.pt');
            console.log('crotch');
            break;
        default:
            console.log('nothing');
    }
    const python = spawn('python3', ['./middleware/app.py', file, modelPath]);

    let result;

    python.stdout.on('data', async (data) => {
        console.log(data.toString());
        result = await data.toString();
    })
    python.on('close', () => {
        res.send(result);
    })
}

const getHospital = async (req, res) => {
    let parameters = {
        email: req.body.email
    }

    const userAddr = await authDAO.getAddr(parameters);
    const geocoder = geo(option);

    const regionLatLongResult = await geocoder.geocode(userAddr[0].address);
    const latitude = regionLatLongResult[0].latitude; //위도
    const longitude = regionLatLongResult[0].longitude; //경도
    console.log(latitude, longitude);

    let data = {
        latitude,
        longitude,
        distance: 1.5
    }
    const result = await hospitalDAO.getNearHospital(data);

    res.status(200).send(result);
}

module.exports = {
    detection,
    getHospital
}