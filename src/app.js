import express from "express";
import cors from 'cors';
import 'dotenv/config';
import { clerkWebhook } from "./controllers/clerkWebhook.controller.js";

const app = express()

app.use(express.json({limit : "20kb"}));
app.use(express.urlencoded({limit : "20kb" , extended:true}));
app.use(express.static("./public"));

app.use(cors({
    origin : "*"
}));

    //API to listen to clerk webhook
app.use("/api/v1/clerk" , clerkWebhook);

app.get('/' , (_,res) => res.send('API IS WORKING'));

//import all route here
import userRoute from './routes/users.route.js';
import hotelRoute from './routes/hotel.route.js';
import roomRoute from './routes/room.route.js';
import bookingRoute from './routes/booking.route.js'

app.use('/api/user' , userRoute);
app.use('/api/hotel/register' , hotelRoute);
app.use('/api/rooms/' , roomRoute);
app.use('/api/booking/' , bookingRoute);

export {app}