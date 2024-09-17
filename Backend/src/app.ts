import express, { Request, Response, Application } from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Shopi server is up and running........</h1>");
});

export default app;
