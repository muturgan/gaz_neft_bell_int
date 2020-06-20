import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { AuthorResolver, BookResolver, HelloResolver } from './resolvers';
import type { GraphQLSchema } from 'graphql';


const buildGqlSchema = (): Promise<GraphQLSchema> =>
{
   return buildSchema({
      resolvers: [
         AuthorResolver,
         BookResolver,
         HelloResolver,
      ],
   });
};


export const initApolloServer = async (): Promise<ApolloServer> =>
{
   const schema = await buildGqlSchema();
   return new ApolloServer({
      schema,
      context: ({req}) => ({req}),
   });
};