import express from 'express';
import getAllEventsRoute from '../routes/getAllEventsRoute.js';

const app = express();
app.use(express.json());
app.use('/', getAllEventsRoute);

export default app;