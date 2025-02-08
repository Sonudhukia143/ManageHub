import express from 'express';
import createEventRouter from '../routes/createEventRoute.js';

const app = express();
app.use(express.json());
app.use('/', createEventRouter);

export default app;