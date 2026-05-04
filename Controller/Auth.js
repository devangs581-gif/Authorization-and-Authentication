const bcrypt=require('bcrypt');
const User=require('../Models/User');
const jwt=require('jsonwebtoken');

require('dotenv').config();

exports.signUp = async (req,res)=>{
       try{
          const {name,email,password,role}=req.body;

          const existingUser=await User.findOne({email});
          
          //If user already exist
          if(existingUser){
              return res.status(500).json({
                 message:"Email already Register"
              });
          }
          
          //Password hashing 
          let hashPassword;
          try{
            hashPassword=await bcrypt.hash(password,10);
          }

          catch(err){
               console.error(err);
               return res.status(500).json({
                  message:"Password not hash successfully"
               });
           }

           const response=await User.create({
            name,email,password:hashPassword,role
          });
           console.log("Saved user:", response);
            res.status(200).json({
            message:"Entry Created Successfully"
          });
       }

       catch(err){
          console.error(err);
          return res.status(200).json({
            message:"Error while creating entry "
          });
       }
}


exports.login = async(req,res)=>{
   try{
     //data-fetch
     const {email,password}=req.body;

     //validate data
     if(!email || !password){
         return res.status(400).json({
            success:false,
            message:"Please enter all the required fields"
         });
     }

     let user=await User.findOne({email});
     
     //User exist nhi karta hain tohh
     if(!user){
         return res.status(401).json({
            success:false,
            message:"User not exists in database"
         });
     }

     const payload={
      email:user.email,
      role:user.role,
      id:user._id
     };

     //verify password
     if(await bcrypt.compare(password,user.password)){
        
      //Token-Creation
        let token = jwt.sign(payload,process.env.JWT_SECRET,{
           expiresIn:"2h"
        });
        
        user=user.toObject();
        user.token=token;
        user.password=undefined;
        
        //Cookie Creation
        const options={
          expires:new Date(Date.now()+3*24*60*60*1000),
          httpOnly:true,
        }

        res.cookie("devangCookie",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"User Logged In successfully"
        });
  
     } 

     else{
        return res.status(403).json({
          success:false,
          message:"Please Enter the correct password"
        });
     }


   }

   catch(err){
      console.log(err);
      return res.status(500).json({
         success:false,
         message:"Error in login"
      });
   }
}