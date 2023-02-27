import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv';
import checkDatabase from './middleware/check-database';
import tableRouter from './routers/table';

// Boot express
dotenv.config();
const app: Application = express()

app.use(checkDatabase);

// Application routing
app.use('/tables',tableRouter);
app.use('/', (req: Request, res: Response) => {
  res.status(200).send({ data: 'Hello from Ornio AS' })
});

export default app;
