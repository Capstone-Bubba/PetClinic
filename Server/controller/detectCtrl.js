const spawn = require('child_process').spawn;
const path = require('path');

const detection = (req, res) => {
    file = path.join(__dirname + '/../' + req.file.path);
    const modelPath = path.join(__dirname + '/../public/model/petclinc_model_b0.pt');
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