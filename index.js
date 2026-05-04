const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');

const dns = require("dns");
dns.setServers(['1.1.1.1','8.8.8.8']);

require('dotenv').config();

const PORT=process.env.PORT||3000;


app.use(cookieParser());
app.use(express.json());

const { dbConnect }=require('./Config/database');

dbConnect();

const user=require('./Routes/user');

app.use("/api/v1",user);

//activate
app.listen(PORT,()=>{
    console.log(`App is listening at ${PORT}`);
});



