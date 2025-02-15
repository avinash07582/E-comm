const mongoose = require('mongoose');

 const paymentSchema = mongoose.Schema({
    orderId:{
        type:String,
        required:true
    },
    paymentId:{
        type:String,
        required:true
    },
    signature:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },

   
   },{timestamp:true});
 const Payment = mongoose.model('payment',paymentSchema);
 module.exports = Payment ;