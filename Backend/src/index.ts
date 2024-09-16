require("dotenv").config();
import express, { Request, Response, urlencoded } from "express";
import config from "./config/config";
import connectToDatabase from "./database/connectToDatabase";
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

connectToDatabase(config.db_uri);

app.use(
  cors({
    origin: config.cors_origin,
  })
);
app.use(
  express.json({
    limit: "20kb",
  })
);
app.use(
  urlencoded({
    extended: true,
    limit: "20kb",
  })
);
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Shopi server is running......</h1>");
});

app.listen(config.port, () => {
  console.log(`Shopi server is running on http://localhost:${config.port}`);
});
