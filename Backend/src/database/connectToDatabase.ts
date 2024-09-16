const mongoose = require("mongoose");
const config = require("../config/config");
const DB_NAME = require("../constants");

async function connectToDatabase(db_uri: string) {
  try {
    const connectionInstance = await mongoose.connect(`${db_uri}/${DB_NAME}`);
    if (connectionInstance) {
      console.log("Database connection successful.");
    }
  } catch (error) {
    throw new Error("Database connection failed");
  }
}

export default connectToDatabase;
