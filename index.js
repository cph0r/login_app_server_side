const express  = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const cookie_parser = require("cookie-parser")
const cors = reuire("cors")


dotenv.config();

// set up server
const app = express();
const PORT  = process.env.PORT || 5000;
app.listen(PORT,()=> console.log('server started on port:', PORT));
app.use(express.json()) 
app.use(cookie_parser()) 
app.use(cors({
    origin:['http:localhost:3000'],
    credentials:true
}))

// connect to mongoose 
mongoose.connect(process.env.MDB_CONNECT,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
},(err)=>{
    if(err) console.log(err);
    console.log('Connected to DB') 
})

// set up routes 

app.use('/auth',require('./routers/user'));
app.use('/dashboard',require('./routers/dashboard'));

