import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema, Resolver, Query } from 'type-graphql';
import type { Server } from 'http';

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

   return app.listen(3333, () => {
      console.info('server started on http://localhost:3333/graphql');
   });
};