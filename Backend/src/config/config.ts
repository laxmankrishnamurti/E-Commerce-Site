interface Config {
  port: number;
  db_uri: string;
}

const config: Config = {
  port: Number(process.env.PORT),
  db_uri: String(process.env.MONGODB_URI),
};

export default Object.freeze(config);
