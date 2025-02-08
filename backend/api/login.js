import express from 'express';
import logInRouter from '../routes/loginRoute.js';

const app = express();
app.use(express.json());
app.use('/', logInRouter);

export default app;