import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from './routes/auth';
import userRoutes from './routes/users';

import { errorHandler } from './utils/error';

dotenv.config();

const app = express();

//Middleware
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000"
  })
);

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  return console.log(`Security API is listening at http://localhost:${process.env.PORT || 3000}`);
});