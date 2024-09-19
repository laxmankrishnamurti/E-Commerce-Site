import express, { Application } from "express";
import cors from "cors";
import { globalErrorHandler } from "./utils/customErrorHandler.utils";

const app: Application = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "20kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(globalErrorHandler);

export default app;
