interface Config {
  port: number;
  db_uri: string;
  jsonwebtoken_secret: string
}

const config: Config = {
  port: Number(process.env.PORT),
  db_uri: String(process.env.MONGODB_URI),
  jsonwebtoken_secret: String(process.env.JSONWEBTOKEN_SECRET_TOKEN)
};

export default Object.freeze(config);
