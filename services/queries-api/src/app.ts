import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./utils/error";

//Routers
import bancoRouter from "./routes/bancos";
import metodoRouter from "./routes/metodos";
import servicioRouter from "./routes/servicios";

import { verifyUser, verifyAdmin } from './utils/jwt';

dotenv.config();

const app = express();

//Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("api/bancos", bancoRouter);
app.use("api/metodos", metodoRouter);
app.use("api/servicios", verifyAdmin,servicioRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  return console.log(`Queries API is listening at http://localhost:${process.env.PORT}`);
});