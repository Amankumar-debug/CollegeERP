const mongoose=require("mongoose");
const User=require("./user");

const Schema=mongoose.Schema;

const staffSchema=new Schema({
    name:String,
    father_name:String,
    department:String,
    phone_no:Number,
    image:{
        filename:String,
        url:String
    },
    salary:Number,
    address:String,
    email:String,
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
})

module.exports=mongoose.model("Staff",staffSchema);