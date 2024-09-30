interface Config {
  port: number;
  is_local: boolean;
  db_uri: string;
  access_token_secret: string;
  refresh_token_secret: string;
}

const config: Config = {
  port: Number(process.env.PORT),
  is_local: process.env.IS_LOCAL === "true",
  db_uri: String(process.env.MONGODB_URI),
  access_token_secret: String(process.env.ACCESS_SECRET_TOKEN),
  refresh_token_secret: String(process.env.REFRESH_SECRET_TOKEN),
};

export default Object.freeze(config);
