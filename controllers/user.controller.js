 const userModel = require("../models/user.model");
 const jwt = require("jsonwebtoken");
 const bcrypt = require("bcrypt");
 const blackListModel = require("../models/blacklist.model");
 const productModel = require("../models/product.model");
 const Razorpay = require('razorpay');
 require("dotenv").config();
 const paymentModel = require("../models/payment.model");
 const orderModel = require("../models/order.model");


var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

 module.exports.signup  =  async (req, res, next) => {
    try{
        const { username, password, email,role } = req.body;
        if(!email || !password || !username) {
            return res.status(400).json({ message: "All fields are required" });

        }
        const isUserAlreadyExists = await userModel.findOne({email});
        if(isUserAlreadyExists){
            return res.status(400).json({ message: "User already exists" });
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            email,
            password: hashedPassword,
            username,
            role,
            
        
        });
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"})
        res.status(201).json({
            message: "User created successfully",
            user,
            token,
        })


    }catch(err){
        next(err);

    }
 };


 module.exports.sinning = async (req, res, next) => {
   try {
    const{ email,password } = req.body;
    if(!email ||!password){
        return res.status(400).json({ message: "All fields are required" });
    }
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"})
    res.status(201).json({
        message: "User signed in successfully",
        user,
        token,
    })
    
   } catch (error) {
    next(error)
    
   } 
 };
 module.exports.logout = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[ 1 ];
        if(!token){
            return res.status(401).json({ message: "No token provided" });
        };
        const isTokenBlacklisted = await blackListModel.findOne({token});
        if(isTokenBlacklisted){
            return res.status(401).json({ message: "Token is blacklisted" });
        }
        await blackListModel.create({token});
        
    } catch (error) {
        next(error);
        
    }
 };
 
 module.exports.getProfile = async (req, res, next) => {
     try {
        const user = await userModel.findById(req.user._id)
        res.status(200).json({
            message: "User profile fetched successfully", 
            user,
            
        })

        
     } catch (error) {
        next(error)
        
     }
 };

 module.exports.getProducts = async (req, res, next) => {
    try {
        const products  = await productModel.find({});
        res.status(200).json({
            message: "Products fetched successfully",
            products,
            
        })
        
    } catch (error) {
        next(error)
        
    }
 };
module.exports.getProductById = async (req, res, next) => {
    try {
        const product = await productModel.findById(req.params.id)
    res.status(200).json({
        product
    })
    } catch (error) {
        next(error)
    }
};
module.exports.createOrder = async (req, res,next) => {
    try {
        const product =  productModel.findById(req.params.id);
        const option ={
            amount: product.amount * 100,
            currency: "INR",
            receipt: product._id,
            
        }
        const order= await instance.orders.create(option)
        res.status(200).json({
            order
        })
        const payment  = await paymentModel.create({
            order_id: order.id,
          status: "pending",
            amount: product.amount,
            currency: "INR",
        })
        
    } catch (error) {
        next(error)
        
    }
};
module.exports.verifyPayment = async (req, res, next) => {
    try {
        const {paymentId,orderId,signature} = req.body;
        const secret = process.env.RAZORPAY_KEY_SECRET

        const {validatePaymentVerification} = require("../node_modules/razorpay/dist/utils/razorpay-utils.js")
        const isValid = validatePaymentVerification({
            order_id:orderId,
            payment_id:paymentId
        },signature,secret)
         if(isValid){
            const payment = await paymentModel.findOne({
                orderId: orderId
            })
            payment.paymentId = paymentId;
            payment.signature = signature;
            payment.status = "success";
            await payment.save();
            res.status(200).json({
                message: "Payment successful",
                
            })

         }else{
            const payment = await paymentModel.findOne({
                orderId: orderId
            })
            payment.status = "failed";
            res.status(404).json({
                message: "Payment failed",
            })

         }
    } catch (error) {
        next(error);
    }
};
