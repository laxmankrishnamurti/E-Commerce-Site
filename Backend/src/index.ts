import "dotenv/config";
import connectToDatabase from "./database/connectToDatabase.ts";
import config from "./config/config.ts";
import { DB_NAME } from "./constants.ts";
import app from "./app.ts";

connectToDatabase(config.db_uri, DB_NAME)
  .then(() => {
    app.listen(config.port, () => {
      console.log(`app is running on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed. Msg : ", error);
    process.exit(1)
  });
