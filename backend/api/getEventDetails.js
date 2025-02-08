import express from "express";
import getEventDetails from "../routes/getEventDetails.js";

const app = express();
app.use(express.json());
app.use('/', getEventDetails);

export default app;