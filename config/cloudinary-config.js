// const cloudinary = require('cloudinary').v2;
// require('dotenv').config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// module.exports = { cloudinary };



// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// require('dotenv').config();

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET
// });

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: (req, file) => 'wanderLust_DEV',
//         //   format: async (req, file) => {
//         //     // async code using `req` and `file`
//         //     // ...
//         //     return 'jpeg';
//         //   },
//         allowedFormats: ["png", "jpg", "jpeg"],
//     },
// });

// module.exports = { cloudinary, storage }; 
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "wanderLust_DEV",  // ✅ Fixed: Now a string
        allowedFormats: ["png", "jpg", "jpeg"],
    },
});

// module.exports = { cloudinary, storage };
module.exports = cloudinary;
