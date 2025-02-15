 const mongoose = require('mongoose');

 const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images:[{
        type: String,
        
    }],
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
   
 },{timestamp:true})
 const Product = mongoose.model('product',productSchema);
 module.exports = Product;