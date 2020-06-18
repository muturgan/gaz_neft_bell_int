import 'reflect-metadata';
import type { Server } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema, Resolver, Query } from 'type-graphql';
import { createConnection } from 'typeorm';
import { Book, Author } from './entities';
import express from 'express';
import config from './nconf';

const HOST = config.get('host');
const PORT = config.get('port');

const DB_TYPE = config.get('db_type');
const DB_HOST = config.get('db_host');
const DB_PORT = config.get('db_port');
const DB_NAME = config.get('db_name');
const DB_USER = config.get('db_user');
const DB_PASS = config.get('db_password');

@Resolver()
class HelloResolver {
   @Query(() => String)
   public helloWorld() {
      return 'Hello World!';
   }
}

export const startServer = async (): Promise<Server> =>
{
   await createConnection({
      type: DB_TYPE,
      database: DB_NAME,
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASS,
      logging: false,
      synchronize: true,
      entities: [Book, Author],
   });

   const schema = await buildSchema({
      resolvers: [HelloResolver],
   });

   const apolloServer = new ApolloServer({ schema });

   const app = express();

   apolloServer.applyMiddleware({ app });

   return app.listen(PORT, () => {
      console.info(`server started on http://${HOST}:${PORT}/graphql`);
   });
};