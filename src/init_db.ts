import { createConnection, Connection } from 'typeorm';
import { Book, Author } from './entities';


export const initDatabase = (): Promise<Connection> =>
{
   return createConnection({
      type: process.env.DB_TYPE as any,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      logging: process.env.DB_LOG === 'true',
      synchronize: process.env.DB_SYNC === 'true',
      entities: [Book, Author],
   });
};