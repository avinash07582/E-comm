

// const express = require('express');
// const router = express.Router();
// const cloudinary = require  ("../config/cloudinary-config")
// const upload = require  ("../config/multer-config")
// const authMiddleware = require("../middlewares/auth.middleware")
// router.get('/create-product', upload.single('image'),()=>{})
 

// module.exports = router;
const express = require('express');
 const router = express.Router();
 const cloudinary = require  ("../config/cloudinary-config")
 const upload = require  ("../config/multer-config")
 const authMiddleware = require("../middlewares/auth.middleware")
 router.use(authMiddleware.isAuthenticated).use(authMiddleware.isSeller)
 const productController = require("../controllers/product.controller")



 router.post('/create-product', upload.any(),productController.createProduct)


module.exports = router;