const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
    name:{type:String,required:true}
})

const Customer  = new mongoose.model("customer",customerSchema);

module.exports = User; 