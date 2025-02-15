//  const productModel = require("../models/product.model")

//  exports.createProduct = async (req,res)=>{
//     async (req, res) => {
//         try {
//             // Ensure an image is provided
//             if (!req.file) {
//                 return res.status(400).json({ success: false, message: "Image is required!" });
//             }
    
//             // Upload image to Cloudinary
//             const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);

//             const {name,description,price} = req.body;
//             if(!name || !description || !price){
//                 return res.status(400).json({ success: false, message: "All fields are required!" });
//             } 
//             res.status(201).json({message: "Product created successfully"})
    
            
//         }
//     catch (error) {
//             console.error(error);
//             return res.status(500).json({ success: false, message: "Internal server error" });
//         }
//  }
// }
    
           

// const cloudinary = require("../config/cloudinary-config");
const cloudinary = require("../config/cloudinary-config");

const productModel = require("../models/product.model");

exports.createProduct = async (req, res) => {
    try {
        // Ensure images are provided
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "At least one image is required!" });
        }

        const { name, description, price } = req.body;
            // const images =req.files.map(file=>file.path).filter(path? true : false)
            const images = req.files.map(file => file.path).filter(path => path);

            console.log(images);
            
            
        if (!name || !description || !price) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        // Upload images to Cloudinary
        const uploadedImages = await Promise.all(
            req.files.map(async (file) => {
                const cloudinaryResult = await cloudinary.uploader.upload(file.path);
                return cloudinaryResult.secure_url;
            })
        );

        // Create product in DB
        const product = await productModel.create({
            name,description,price,images:uploadedImages, seller:req.user._id,
        })

        res.status(201).json({ success: true, message: "Product created successfully" });

    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};




            // const newProduct = await Product.create({
            //     name: req.body.name,
            //     description: req.body.description,
            //     price: req.body.price,
            //     imageUrl: cloudinaryResult.secure_url, // Store Cloudinary image URL
            // });
    