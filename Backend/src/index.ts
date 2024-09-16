import express, { Request, Response } from "express";
require("dotenv").config();
import config from "./config/config";
import connectToDatabase from "./database/connectToDatabase";

const app = express();

connectToDatabase(config.db_uri);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Shopi server is running......</h1>");
});

app.listen(config.port, () => {
  console.log(`Shopi server is running on http://localhost:${config.port}`);
});
