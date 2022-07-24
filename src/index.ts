import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";

// import { errorHandlerMiddleware } from "./middlewares/errorMiddleware.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();
app.use(json());
app.use(router);
// app.use(errorHandlerMiddleware);

export default app;
