import express, { Application } from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import { globalErrorHandler } from "./utils/customErrorHandler.utils.ts";
import path from "path";
import { fileURLToPath } from "url";

// Simulation of __dirname in ES6
const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const app: Application = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(compression());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// const dir = path.resolve(__dirname, "..", "public");
app.use("/public", express.static(path.resolve(__dirname, "..", "public")));

app.use(
  express.json({
    limit: "20kb",
  })
);

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cookieParser());

// Importing routes
import sellersRouter from "./routes/sellers.routes.ts";

// Defining routes
app.use("/api/v1/s", sellersRouter);

app.use(globalErrorHandler);

export default app;
