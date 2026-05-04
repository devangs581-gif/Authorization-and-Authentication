const jwt=require('jsonwebtoken');
require('dotenv').config()

exports.auth = (req,res,next)=>{
     try{
       const token=req.body?.token || req.cookies?.devangCookie || req.headers.authorization?.split(" ")[1];;
       
       console.log("HEADER:", req.headers.authorization);
       console.log("COOKIE",req.cookies.devangCookie);

       if(!token || token === undefined){
          return res.status(401).json({
            success:false,
            message:"Token is Missing"
          });
       }

       try{
          //Token ko decode karne kain liye 
          const decode=jwt.verify(token,process.env.JWT_SECRET);

          console.log(decode);

          req.user=decode;
       }catch(error){
          return res.status(401).json({
            success:false,
            message:"Invalid or Expire token"
          })
       }
      next();
     }catch(error){
        console.log("HEADER:", req.headers.authorization);
        console.log("COOKIE",req.cookies.devangCookie);
         return res.status(401).json({
            success:false,
            message:"Error while Autherization the token"
         });
     }
}


exports.isStudent = (req,res,next)=>{
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This route is only for students"
            });
        }

        next();
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User Role is not matching"
        });
    }
}

exports.isAdmin = (req,res,next)=>{
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This route is only for Admin"
            });
        }

        next();
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User Role is not matching"
        });
    }
}