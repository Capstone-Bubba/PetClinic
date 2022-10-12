const multer = require('multer');

const photo = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'public/images');
    },
    filename(req, file, cb) {
        cb(null, `${file.originalname}`);
    }
});

const profilePhoto = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/profileImg');
    },
    filename(req, file, cb) {
        cb(null, `${file.originalname}`);
    }
})

const Doctorphoto = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'public/images/vet_thumbnail');
    },
    filename(req, file, cb) {
        cb(null, `${file.originalname}`);
    }
})

const uploadPhoto = multer({
    storage: photo,
    fileFilter : (req, file, cb) => {
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            req.fileValidationError = "jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.";
            // cb({msg: '.png .jpg .jpeg 형식의 파일만 업로드 가능합니다.'}, false);
            cb(null, false);
        }
    }
});

const uploadProfilePhoto = multer({
    storage: profilePhoto,
    fileFilter : (req, file, cb) => {
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            req.fileValidationError = "jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.";
            // cb({msg: '.png .jpg .jpeg 형식의 파일만 업로드 가능합니다.'}, false);
            cb(null, false);
        }
    }
})

const DocPhoto = multer({
    storage: Doctorphoto,
    fileFilter : (req, file, cb) => {
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            req.fileValidationError = "jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.";
            // cb({msg: '.png .jpg .jpeg 형식의 파일만 업로드 가능합니다.'}, false);
            cb(null, false);
        }
    }
})

module.exports = {
    uploadPhoto,
    uploadProfilePhoto,
    uploadPhoto,
    DocPhoto,
}