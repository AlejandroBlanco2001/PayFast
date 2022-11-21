import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";

import transaccionRouter from './routes/transaccion';

import { errorHandler } from "./utils/error";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

dotenv.config();

const app = express();

//Middleware
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));

app.use(cookieParser());
app.use(express.json());

app.use('/api/transaccion', transaccionRouter);

app.set('queues', []);
app.set('port', process.env.PORT || 5000);

app.use(errorHandler);

setInterval(async () => {
    console.log(app.get('queues'));
}, 1000);

app.listen(app.get('port'), () => {
  return console.log(`Transactions API is listening at http://localhost:${process.env.PORT}`);
});