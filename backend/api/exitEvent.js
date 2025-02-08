import express from "express";
import exitEventRouter from "../routes/exitEventRoute.js";

const app = express();
app.use(express.json());
app.use('/', exitEventRouter);

export default app;