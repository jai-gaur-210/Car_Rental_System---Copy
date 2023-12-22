import express from 'express'
import connectDB from './config/connectDB.js';
import authRoutes from './Routes/authRoutes.js'
import rentRoutes from './Routes/RentCrudRoutes.js'
import cors from 'cors'
const app = express();

app.use(express.json());


app.get('/',(req,res)=>{
    res.send("Hello Customer");
})
app.use(cors())
app.use('/api/auth',authRoutes);
app.use('/api/rent',rentRoutes);
connectDB();
app.listen('8000',()=>{
    console.log("Connected to server")
})