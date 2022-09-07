const spawn = require('child_process').spawn;
const path = require('path');

const detection = (req, res) => {
    const part = req.body.part
    let modelPath;
    file = path.join(__dirname + '/../' + req.file.path);
    switch(part) {
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
    const net = spawn('python3', ['./middleware/app.py', file, modelPath]);

    net.stdout.on('data', (data) => {
        console.log(data.toString());
        const result = data.toString();
        res.send({result})
    })
}

module.exports = {
    detection
}