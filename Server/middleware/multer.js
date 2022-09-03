const multer = require('multer');

const photo = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'public/images');
    },
    filename(req, file, cb) {
        cb(null, `${file.originalname}`);
    }
});

const uploadPhoto = multer({storage: photo});

module.exports = {
    uploadPhoto
}