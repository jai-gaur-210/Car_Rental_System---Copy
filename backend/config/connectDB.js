import mongoose from "mongoose";
//Connecting
const connectDB=async ()=>{
    try {
        const conn= await mongoose.connect("mongodb+srv://Apurv-210:Apurv123@cluster0.8peqas4.mongodb.net/CarRentalSystem")
        console.log(`Connected To Mongodb Database ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error in Mongodb ${error}`)
    }
}

export default connectDB;