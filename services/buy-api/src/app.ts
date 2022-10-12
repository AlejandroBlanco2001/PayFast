import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";

import transaccionRouter from './routes/transaccion';

import { errorHandler } from "./utils/error";

dotenv.config();

const app = express();

//Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('api/transaccion', transaccionRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  return console.log(`Express is listening at http://localhost:${process.env.PORT}`);
});