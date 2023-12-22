import mongoose from "mongoose";

const carSchema= mongoose.Schema({
    VechileModel:{
        type:String,
        required:true
    },
    VechileNo:{
        type:String,
        required:true,
        unique:true
    },
    Capacity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
    },
    owner:{
        type:mongoose.ObjectId,
        ref:"users",
        required:true
    },
    rentedBy:{
        type:mongoose.ObjectId,
        ref:"users"
    },
    Days:{
        type:Number
    },
    StartDate:{
        type:Date
    }
},{timestamps:true})
export default mongoose.model("cars",carSchema);
