interface IConfig {
  port: number;
  mongoClientUrl: string;
}

export const config: IConfig = {
  port: parseInt(process.env.PORT!) || 7645,
  mongoClientUrl: 'mongodb://localhost:27017',
};
