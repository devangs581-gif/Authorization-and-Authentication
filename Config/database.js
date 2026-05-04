require('dotenv').config();

const mongoose=require('mongoose');

const dbConnect=async ()=>{
      mongoose.connect(process.env.URL).then(()=>{
        console.log("Database connected successfully")
      }).catch((error)=>{
            console.error(error);
            console.log("Database is not connected successfully");
            process.exit(1);
      })
}

module.exports=dbConnect;