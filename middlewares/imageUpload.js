//  const multer = require('multer');
//  const {cloudinary} = require("../config/cloudinary-config"); 
// const { options } = require('../routes/index.routes');

//  const uploadPhoto = multer({
//     stoarge:multer.memoryStorage(),
//     limits:{fileSize:20_000_000},
//     fileFilter:(req,file,cb)=>{
//         if(file.mimetype.startsWith("image/"))cb(null,true);
//         else cb(new Error("Please upload an image"),false);
//     }
//  });

//  const uploadToCloudinary = (buffer,options={})=>{

//     return new Promise((resolve,reject)=>{
//         cloudinary.uploader.upload_stream(options,(err,result)=>{
//             if(err)reject(err);
//             else resolve(result.secure_url);
//         }).end(buffer);
//     });
//  }

//  const resizeAndUploadImage = async (req,res,next)=>{
//     if(!req.files || req.files.length ===0) return next();

//     try {
//         const uploadPromises = req.files.map(file=> uploadToCloudinary(file.buffer,{
//             transformation :[{width:200,height:200,crop:"limit"}]
//         })

//     );

//     const results = await Promise.all(uploadPromises);
//     req.imageUrls = results.map(result=>result.url)
//     next();
        
//     } catch (error) {
//         next(error);
        
//     }
//  }

const multer = require('multer');
const { cloudinary } = require("../config/cloudinary-config"); 

const uploadPhoto = multer({
    storage: multer.memoryStorage(), // ✅ Fixed typo
    limits: { fileSize: 20_000_000 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) cb(null, true);
        else cb(new Error("Please upload an image"), false);
    }
});

const uploadToCloudinary = (buffer, options = {}) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(options, (err, result) => {
            if (err) reject(err);
            else resolve(result.secure_url); // ✅ Fixed result.url → result.secure_url
        }).end(buffer);
    });
};

const resizeAndUploadImage = async (req, res, next) => {
    if (!req.files || req.files.length === 0) return next();

    try {
        const uploadPromises = req.files.map(file =>
            uploadToCloudinary(file.buffer, {
                transformation: [{ width: 200, height: 200, crop: "limit" }]
            })
        );

        const results = await Promise.all(uploadPromises);
        req.imageUrls = results; // ✅ Fixed result.url → result.secure_url
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { uploadPhoto, resizeAndUploadImage }; // ✅ Properly exported
