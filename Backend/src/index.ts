require("dotenv").config();
import express, { Request, Response } from "express";
import config from "./config/config";
import connectToDatabase from "./database/connectToDatabase";
const cors = require("cors");

const app = express();

connectToDatabase(config.db_uri);

app.use(
  cors({
    origin: config.cors_origin,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Shopi server is running......</h1>");
});

app.listen(config.port, () => {
  console.log(`Shopi server is running on http://localhost:${config.port}`);
});
