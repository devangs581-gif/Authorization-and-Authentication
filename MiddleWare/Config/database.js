const mongoose=require('mongoose');

require('dotenv').config();


exports.dbConnect=()=>{
    mongoose.connect(process.env.URL).then(()=>{
        console.log("DB Connected successfully");
    }).catch((err)=>{
        console.error(err);
        console.log("Error occur while connecting from database");
        process.exit(1);
    });
}

