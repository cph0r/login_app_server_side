const router = require("express").Router();
const User = require("../models/user");
const bcrypt= require("bcryptjs")
const jwt = require("jsonwebtoken")

// register
router.post('/',async (req,res)=>{
    try{
    const {email,password,passwordVerify} = req.body

    if(!email || !password || !passwordVerify){
        return res.status(400).json({errorMessage:"Please enter all required fields"})
    }

    if(password.length<6){
        return res.status(400).json({errorMessage:"Password length should be greater than 6"})
        
    }

    if(!password || !passwordVerify){
        return res.status(400).json({errorMessage:"Passwords should be same"})
    }

    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({errorMessage:"User Already exist"})
    }

    // hashing the password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password,salt)

    // creating new user
    console.log(email,hashPassword)
    const new_user= new User({email:email,password:hashPassword})
    const saved_user = await new_user.save();

    // log the user in
    const token = jwt.sign({
        user:saved_user._id
    },process.env.JWT_KEY);

    // send token in form of cookie
    res.cookie('token',token,{
        httpOnly:true
    }).send()
    }
    catch(e){
        console.log(e)
        res.status(500).send();
    }
});



// login
router.post('/login',async (req,res)=>{
    try{
        const {email,password,passwordVerify} = req.body

        if(!email || !password){
            return res.status(400).json({errorMessage:"Please enter all required fields"})
        }

        const existingUser = await User.findOne({email})

        if(!existingUser){
            return res.status(400).json({errorMessage:"User Does not exist"})
        }

        const passowrd_correct = await bcrypt.compare(password,existingUser.password)
        if(!passowrd_correct){
            return res.status(400).json({errorMessage:"Wrong Password"})
        }

        const token = jwt.sign({
            user:existingUser._id
        },process.env.JWT_KEY);
    
        // send token in form of cookie
        res.cookie('token',token,{
            httpOnly:true
        }).send()


    }
    catch(e){
        console.log(e)
    }
});

// logout
router.get('/logout',async (req,res)=>{
    res.cookie('token','',{
        httpOnly:true,
        expires:new Date(0)
    })
});



router.get('/loggedin',async (req,res)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({ errorMessage: 'Unautharized' });
        }
        
        jwt.verify(token,process.env.JWT_KEY)
        res.send(true)
    } catch (e) {
        console.log(e)
        res.send(false)
    }
})
    


module.exports = router;