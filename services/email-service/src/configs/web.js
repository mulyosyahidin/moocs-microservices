import express from "express";
import apiRouter from "../routes/api.js";
import errorMiddleware from "../middlewares/error-middleware.js";
import morgan from "morgan";

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(apiRouter);
app.use(errorMiddleware);

export default app;