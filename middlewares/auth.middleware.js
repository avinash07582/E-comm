const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");
const blackListModel = require("../models/blacklist.model");


module.exports.isAuthenticated = async (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[ 1 ];
        // const token = req.headers.authorization?.split(" ")[1];

        const isBlackListed = await blackListModel.findOne({token});
        if(isBlackListed){
            return res.status(401).json({message:"Token is blacklisted"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded._id);
        if(!user) {
            return res.status(401).json({message:"Unauthorized"

            });
        }
        req.user = user;
        next();
        
    } catch (error) {
        next (error);
        
    }
}


module.exports.isSeller = async (req, res, next) => {
    try {
      console.log("Middleware isSeller reached."); // ✅ Log
  
      if (!req.user) {
        console.log("User not found in request."); // ✅ Log
        return res.status(401).json({ message: "User not authenticated" });
      }
  
      console.log("User role:", req.user.role); // ✅ Log
  
      if (req.user.role !== "seller") {  
        console.log("User is not a seller."); // ✅ Log
        return res.status(403).json({ message: "You are not a seller" });
      }
  
      console.log("User is a seller, proceeding to next middleware."); // ✅ Log
      next(); // Continue to next middleware
  
    } catch (error) {
      console.error("Error in isSeller middleware:", error); // ✅ Log error
      next(error);
    }
  };
  


// module.exports.isSeller = async (req, res, next)=>{


//   try {
//     const user = req.user;
//     console.log("User role:", req.user.role);
//     if (user.role !== "seller") {  // ✅ Correct condition
//         return res.status(403).json({ message: "You are not a seller" });
//     }
    
//      next();

    
//   } catch (error) {
//     next (error);
    
//   }
// };