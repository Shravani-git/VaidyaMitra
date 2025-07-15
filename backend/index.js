import express from"express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from './Routes/auth.js'
import userRoute from './Routes/user.js'
import doctorRoute from './Routes/doctor.js'
import reviewRoute from './Routes/review.js'
import bookingRoute from './Routes/booking.js'
import appointmentRoute from './Routes/appointment.js'

dotenv.config()

const app=express()
const port = process.env.PORT || 5000
const corsOptions ={
    origin:true
};

app.get("/",(req,res)=>{
    res.send("Api is working");
});

//database connection
mongoose.set('strictQuery',false)
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB database is connected");
    }catch(err){
        console.log("MongoDB database connection failed");
    }
}

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth', authRoute)  //domain/api/v1/auth/register
app.use('/api/v1/users', userRoute)  //domain/api/v1/auth/user
app.use('/api/v1/doctors', doctorRoute)  //domain/api/v1/auth/doctor
app.use('/api/v1/reviews', reviewRoute) 
app.use('/api/v1/bookings', bookingRoute)  //domain/api/v1/auth/doctor
app.use('/api/v1/appointments', appointmentRoute);  //domain/api/v1/auth/doctor
app.listen(port, ()=>{
    connectDB();
    console.log(`Server running on port ${port}`);
})

console.log("JWT_SECRET_key:", process.env.JWT_SECRET_key);
console.log("MONGO_URL:", process.env.MONGO_URL);
console.log("PORT:", process.env.PORT);

// const crypto = require('crypto-browserify');
// const randomBytes = crypto.randomBytes(16).toString('hex');
// console.log(randomBytes);
