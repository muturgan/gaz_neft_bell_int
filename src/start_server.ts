import 'reflect-metadata';
import type { Server } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema, Resolver, Query } from 'type-graphql';
import express from 'express';
import config from './nconf';

const host = config.get('host');
const port = config.get('port');

@Resolver()
class HelloResolver {
   @Query(() => String)
   public helloWorld() {
      return 'Hello World!';
   }
}

export const startServer = async (): Promise<Server> =>
{
   const schema = await buildSchema({
      resolvers: [HelloResolver],
   });

   const apolloServer = new ApolloServer({ schema });

   const app = express();

   apolloServer.applyMiddleware({ app });

   return app.listen(port, () => {
      console.info(`server started on http://${host}:${port}/graphql`);
   });
};