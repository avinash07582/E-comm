 const mongoose = require('mongoose');



  const connectDB =  ()=>{
    try {
         mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log("Connected to Mongodb");
         }).catch((error)=>{
            console.log(error);
            
         })
       
        
        
    } catch (error) {
        console.log(error.message);
        
        
    }
  }
  module.exports = connectDB;