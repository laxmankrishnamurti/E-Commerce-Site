
interface Config {
  port: number;
  is_local: boolean;
  db_uri: string;
  jsonwebtoken_secret: string;
}

const config: Config = {
  port: Number(process.env.PORT),
  is_local: process.env.IS_LOCAL === 'true',
  db_uri: String(process.env.MONGODB_URI),
  jsonwebtoken_secret: String(process.env.JSONWEBTOKEN_SECRET_TOKEN)
};

export default Object.freeze(config);
