import express from 'express';
import signUpRouter from '../routes/signinRoute.js';

const app = express();
app.use(express.json());
app.use('/', signUpRouter);

export default app;