import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

//Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.listen(process.env.PORT, () => {
  return console.log(`Queries API is listening at http://localhost:${process.env.PORT}`);
});