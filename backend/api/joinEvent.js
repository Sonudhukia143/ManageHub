import express from "express";
import joinEventRouter from "../routes/joinEventRoute.js";

const app = express();
app.use(express.json());
app.use('/', joinEventRouter);

export default app;