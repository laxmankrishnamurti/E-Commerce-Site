const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  db_uri: process.env.MONGODB_URI ? String(process.env.MONGODB_URI) : "",
  cors_origin: String(process.env.CORS_ORIGIN),
};

module.exports = Object.freeze(config);
