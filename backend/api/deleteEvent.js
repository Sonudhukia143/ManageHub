import express from "express";
import deleteEventRouter from "../routes/deleteEventRoute.js";

const app = express();
app.use(express.json());
app.use('/', deleteEventRouter);

export default app;