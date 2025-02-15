// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// const storage = multer.diskStorage({
//   filename: function (req,file,cb) {
//     cb(null, file.originalname)
//   }
// });

// const upload = multer({storage: storage});

// module.exports = upload;
// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const { cloudinary } = require('../config/cloudinary-config');  // Import Cloudinary config

// // Configure Cloudinary Storage
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: "wanderLust_DEV",  // Cloudinary folder name
//         allowed_formats: ["jpg", "png", "jpeg"],
//     },
// });

// // Multer upload middleware (Cloudinary)
// const upload = multer({ storage });

// module.exports = upload;


const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary-config");  // ✅ Import Cloudinary properly

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,  // ✅ Pass the correct cloudinary instance
    params: {
        folder: "wanderLust_DEV",
        allowedFormats: ["png", "jpg", "jpeg"],
    },
});

const upload = multer({ storage });

module.exports = upload;
