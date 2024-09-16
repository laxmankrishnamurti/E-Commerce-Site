const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  db_uri: process.env.MONGODB_URI ? String(process.env.MONGODB_URI) : "",
};

export default config;
