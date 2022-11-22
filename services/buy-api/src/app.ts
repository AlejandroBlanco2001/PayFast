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
  origin: ["https://pay-fast-ten.vercel.app","http://localhost:3000"]
}));

app.use(cookieParser());
app.use(express.json());

app.use('/api/transaccion', transaccionRouter);

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  return console.log(`Transactions API is listening at http://localhost:${process.env.PORT || 5000}`);
});