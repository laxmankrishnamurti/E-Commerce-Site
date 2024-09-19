import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./utils/customErrorHandler.utils.ts";

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

app.use(cookieParser());

// Importing routes
import sellersRouter from "./routes/sellers.routes.ts";

// Defining routes
app.use("/api/v1/sellers", sellersRouter);

app.use(globalErrorHandler);

export default app;
