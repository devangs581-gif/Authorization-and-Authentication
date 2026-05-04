const express=require('express');
const router=express.Router();

const {login,signUp}=require('../Controller/Auth');
const {auth,isStudent,isAdmin}=require('../MiddleWare/auth');


router.post('/login',login);
router.post('/signUp',signUp);

//Protected Routes
router.get("/student",auth,isStudent,(req,res)=>{
      res.json({
        success:true,
        message:"Student login Successfully"
      });
});


router.get("/admin",auth,isAdmin,(req,res)=>{
      res.json({
        success:true,
        message:"Admin login Successfully"
      });
});

module.exports=router;
