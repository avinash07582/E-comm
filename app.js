 const express = require('express');
 const cors = require('cors');
 const app = express();
  app.use(cors());
  const indexRoutes = require("./routes/index.routes")
 const userRoutes = require("./routes/user.routes")
//  const userRoutes = require("./routes/user.routes")
 const productRoutes = require("./routes/product.routes")

 require("dotenv").config();
 const ConnectDB = require("./config/mongodb");
 ConnectDB();

 app.use(express.json());
 app.use(express.urlencoded({extended: true}));
 

 app.use("/", indexRoutes);
  app.use("/user", userRoutes);
  app.use("/user", userRoutes);
  app.use("/product", productRoutes);

 app.listen(3001,()=>{
    console.log("Server is running on port 3001");
    
 })



   // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2EwNWI4NDk4NTg5NDgxMWMwZjYwNGUiLCJpYXQiOjE3Mzg1NjI0MzYsImV4cCI6MTczODU2NjAzNn0.VGz3j1XYvK58mpp9-xHVCWJuQcrhkcwZ8L_6c4Aj1ZU"