import { createConnection, Connection } from 'typeorm';
import { Book, Author } from './entities';
import config from './nconf';

const DB_TYPE = config.get('db_type');
const DB_HOST = config.get('db_host');
const DB_PORT = config.get('db_port');
const DB_NAME = config.get('db_name');
const DB_USER = config.get('db_user');
const DB_PASS = config.get('db_password');
const DB_LOG  = config.get('db_logging');
const DB_SYNC = config.get('db_synchronize');


export const initDatabase = (): Promise<Connection> =>
{
   return createConnection({
      type: DB_TYPE,
      database: DB_NAME,
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASS,
      logging: DB_LOG,
      synchronize: DB_SYNC,
      entities: [Book, Author],
   });
};