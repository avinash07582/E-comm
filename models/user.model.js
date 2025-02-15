const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role:{
        type: String,
       enum:["user", "seller"],
        default: 'user'
    }
   
} , {timestamps: true});
  const User = mongoose.model('user', userSchema);
  module.exports = User;

