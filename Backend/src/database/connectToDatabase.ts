import mongoose from "mongoose";

async function connectToDatabase(
  db_uri: string,
  db_name: string
): Promise<void> {
  const connectionInstance = await mongoose.connect(`${db_uri}/${db_name}`);
  if (connectionInstance) {
    console.log("Database connected successfully");
  }
}

export default connectToDatabase;
