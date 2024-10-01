import "dotenv/config";
import connectToDatabase from "./database/connectToDatabase.ts";
import config from "./config/config.ts";
import { DB_NAME } from "./constants.ts";
import app from "./app.ts";

// Handle unhandled promise rejections globally
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1); // Exit with a non-zero status code to indicate failure
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.stack || err);
  process.exit(1); // Forcefully exit after logging
});

connectToDatabase(config.db_uri, DB_NAME)
  .then(() => {
    app.listen(config.port, () => {
      console.log(`app is running on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed. Msg : ", error);
    process.exit(1);
  });
