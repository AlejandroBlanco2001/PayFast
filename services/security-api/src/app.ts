import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from './routes/auth';
import userRoutes from './routes/users';

import { errorHandler } from './utils/error';

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 8000);

//Middleware
app.use(
  cors({
    credentials: true,
    origin: "https://pay-fast-ten.vercel.app"
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