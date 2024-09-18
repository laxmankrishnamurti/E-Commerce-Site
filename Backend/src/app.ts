import express, { Application } from "express";

const app: Application = express();

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

export default app;
