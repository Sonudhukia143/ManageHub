import express from 'express';
import mongoose from 'mongoose';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cron from "node-cron";
import {Event} from "../models/Event.js";
import authMiddleware from '../middlewares/checkAuth.js';

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

import logInRouter from '../routes/loginRoute.js';
import logout from '../routes/logoutRoute.js';
import signUpRouter from '../routes/signinRoute.js';
import createEventRoute from '../routes/createEventRoute.js';
import joinEventRoute from '../routes/joinEventRoute.js';
import exitEventRoute from '../routes/exitEventRoute.js';
import deleteEventRoute from '../routes/deleteEventRoute.js'; 
import getAllEventsRoute from '../routes/getAllEventsRoute.js';
import getEventDetailsRoute from '../routes/getEventDetails.js';

const connectDb = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_ATLAS_URL);
        console.log("Connected to the database.");
    } catch (error) {
        console.log("Error in establishing connection with the database: " + error);
    }
};
//connectDb();

//const Port = 3000;
const app = express();
app.set('trust proxy', true);
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(cookieParser());

const corsOptions = {
    origin: ['http://localhost:5173'],   
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

//delete expired events 0 * * * * runs and as soon as evented is less than current date the event is deleted
cron.schedule("0 * * * *",async () => {
    try {
        const result = await Event.deleteMany({evented: {$lt:new Date() }});
        if(result.deletedCount > 0) {
            console.log(`Deleted ${result.deletedCount} expired events`);
        }
    } catch (error) {
        console.log("Error deleting expired events" , error);
    }
});

app.use('/api/login', logInRouter);
app.use('/api/logout', logout);
app.use('/api/signin' , signUpRouter);
app.use('/api/events', getAllEventsRoute);
app.use('/api/createevent', authMiddleware,createEventRoute);
app.use('/api/joinevent', authMiddleware ,joinEventRoute);
app.use('/api/exitevent',authMiddleware ,exitEventRoute);
app.use('/api/deleteevent',authMiddleware ,deleteEventRoute);
app.use('/api/event', authMiddleware ,getEventDetailsRoute);
app.get('/api/test', (req,res) => {
    res.send("Hello, The Backend Is Working");
});

app.use('*', (req, res) => {
    res.status(404).send("Could not find the page");
});

//  app.listen(Port, () => {
//      console.log("Server running on " + Port);
//  }); 


  export default async function handler (req, res) {
      await connectDb();

     return app(req, res);
  }; 


  //month/date/year is date structure