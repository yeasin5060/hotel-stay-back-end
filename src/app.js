import express from "express";
import cors from 'cors'
import 'dotenv/config'
import { clerkWebhook } from "./controllers/users.controller.js";

const app = express()

app.use(express.json({limit : "20kb"}));
app.use(express.urlencoded({limit : "20kb" , extended:true}));
app.use(express.static("./public"));

app.use(cors({
    origin : "*"
}));

    //API to listen to clerk webhook
app.use("/api/v1/clerk" , clerkWebhook);

app.get('/' , (_,res) => res.send('API IS WORKING'))

export {app}