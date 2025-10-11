const mongoose=require("mongoose");
const User=require("./user")

const Schema=mongoose.Schema;

const studentSchema=new Schema({
    registration_no:String,
    name:String,
    father_name:String,
    image:{
        filename:String,
        url:String,
    },
    mother_name:String,
    course:String,
    semester:Number,
    default_fees:Number,
    fees:Number,
    email:String,
    college:String,
    university:String,
    address:String,
    created_at:{
        type:Date,
       
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
})


module.exports=mongoose.model("Student",studentSchema);