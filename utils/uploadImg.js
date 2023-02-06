const multer = require("multer")
const path = require("path")
require('dotenv').config()

module.exports = (folder) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, process.env.IMG_PATH + folder)
        },
        filename: (req, file, cb) => {
            var possible = 'abcdefghijklmnopqrstuvwxyz123456789';
            var imgUrl = '';
            for (var i = 0; i < 6; i++) {
                imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            var ext = path.extname(file.originalname).toLowerCase();
            cb(null, imgUrl + ext)
        }
    })
    const upload = multer({ storage: storage })
    return upload
}