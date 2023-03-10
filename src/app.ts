import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv';
import requireDbRouter from './routers/require-db-ready-routes';
import nonDbRouter from './routers/non-db-routes';

// Boot express
dotenv.config();
const app: Application = express()

// Application routing
app.use('/use-db',requireDbRouter);
app.use('/non-db',nonDbRouter);

export default app;
