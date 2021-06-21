const router = require('express').Router();
const User = require("../models/user");
const Customer = require("../models/customer");
const auth = require("../middleware/auth");

// dashboard post 
router.post('/',auth, async (req,res)=>{
    try{
        const {name} = new Customer({name});
        const new_customer = new Customer({name,})
        const saved_customer = await new_customer.save();
        res.json(saved_customer)
    }
    catch(e){
        console.log(e)
    }
});


// dashboard get
router.post('/',auth, async (req,res)=>{
    try{
       const customers = await Customers.find();
       res.json(customers) 
    }
    catch(e){
        console.log(e)
    }
});

module.exports = router;