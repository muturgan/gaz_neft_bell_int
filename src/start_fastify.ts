import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-fastify';
import { buildSchema } from 'type-graphql';
import { AuthorResolver, BookResolver, HelloResolver, AuthorResolverWithFieldResolver } from './resolvers';
import type { GraphQLSchema } from 'graphql';
import { initDatabase } from './init_db';
import fastify, { FastifyInstance } from 'fastify';
import type { integer } from './custom_types';
import type { Connection } from 'typeorm';


const buildGqlSchema = (): Promise<GraphQLSchema> =>
{
   return buildSchema({
      resolvers: [
         AuthorResolver,
         BookResolver,
         HelloResolver,
         AuthorResolverWithFieldResolver,
      ],
   });
};

const initApolloServer = async (): Promise<ApolloServer> =>
{
   const schema = await buildGqlSchema();
   return new ApolloServer({
      schema,
      context: (req) => ({req}),
   });
};


export class FastifyApplication
{
   private _server: FastifyInstance | undefined;
   private _db_conn: Connection | undefined;
   private _apollo: ApolloServer | undefined;


   constructor(
      private readonly _host: string,
      private readonly _port: integer,
      private readonly _restInitialisator: () => FastifyInstance,
      private readonly _dbInitialisator: () => Promise<Connection>,
      private readonly _apolloInitialisator: () => Promise<ApolloServer>,
   ) {}


   public async start(): Promise<void>
   {
      try {
         const [conn, apollo] = await Promise.all([
            this._dbInitialisator(),
            this._apolloInitialisator(),
         ]);
         this._db_conn = conn;
         this._apollo = apollo;

         this._server = this._restInitialisator();
         this._server.register(apollo.createHandler());

         this._server.listen(this._port, this._host, () => {
            console.info(`server started on http://${this._host}:${this._port}/graphql`);
         });

      } catch (err) {
         console.error(err);
         return this.stop();
      }
   }


   public async stop(): Promise<void>
   {
      this._server?.close();

      await Promise.all([
         this._apollo?.stop(),
         this._db_conn?.close(),
      ]);
   }
}

export const fastifyApplication = new FastifyApplication(
   String(process.env.HOST),
   Number(process.env.PORT),
   fastify,
   initDatabase,
   initApolloServer,
);

