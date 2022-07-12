import path from 'path';

interface IConfig {
  port: number;
  mongoClientUrl: string;
  uploadDir: string;
}

export const config: IConfig = {
  port: parseInt(process.env.PORT!) || 7645,
  mongoClientUrl: 'mongodb://localhost:27017',
  uploadDir: path.join(__dirname, 'static', 'files'),
};
